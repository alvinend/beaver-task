import React from "react";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { TaskOverlay } from "./TaskOverlay";
import { Task } from "../services/types";
import { taskService } from "../services/taskService";
import moment from "moment";
import { Button } from "primereact/button";

export const Content = () => {
  const [visible, setVisible] = React.useState(false);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = React.useState("");

  const refreshTasks = async () => {
    const [tasks, error] = await taskService.getAllTasks({
      userId: localStorage.getItem("userID")!,
    });

    if (error) {
      console.error(error);
    }
    console.log(tasks);

    setTasks(tasks);
  };

  React.useEffect(() => {
    refreshTasks();
  }, []);

  const handleCompleteStatus = async (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId)!;

    const status = task.status === "Done" ? "Pending" : "Done";

    const [_, error] = await taskService.updateTask({
      task: { ...task, status },
    });

    if (error) {
      console.error(error);
    }

    refreshTasks();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "93%",
        backgroundColor: "#EFF3F8",
        padding: "0rem 2.4rem",
      }}
    >
      <Card>
        <p className="content-table">
          <DataTable
            rowClassName={(rowData) =>
              rowData.status === "Done" ? "done" : ""
            }
            onRowClick={(e) => {
              setSelectedTaskId(e.data.id);
              setVisible(true);
            }}
            value={tasks.map((task) => ({
              id: task.id,
              title: task.title,
              description: task.description,
              status: task.status,
              dueDate: task.dueDate
                ? moment(task.dueDate).format("YYYY/MM/DD")
                : "",
            }))}
            footer={
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedTaskId("");
                  setVisible(true);
                }}
              >
                <i className="pi pi-plus" style={{ fontSize: "1.5rem" }} />
              </div>
            }
          >
            {/* Checkbox Here */}
            <Column
              field="status"
              headerStyle={{ width: "3rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              sortable
              body={(rowData) => {
                return (
                  <Checkbox
                    inputId="binary"
                    onChange={(e) => handleCompleteStatus(rowData.id)}
                    checked={rowData.status === "Done" ? true : false}
                  />
                );
              }}
            />

            <Column field="id" header="ID" sortable />
            <Column
              field="title"
              header="Title"
              sortable
              filter
              filterPlaceholder="Search by title"
            />
            <Column
              field="description"
              header="Description"
              style={{ maxWidth: "300px" }}
            />
            <Column field="dueDate" header="Due Date" sortable />
            <Column
              body={(rowData) => {
                return (
                  <Button
                    label="Delete"
                    className="p-button-danger"
                    onClick={async () => {
                      await taskService.deleteTask({ taskId: rowData.id });
                      refreshTasks();
                    }}
                  />
                );
              }}
            />
          </DataTable>
        </p>
      </Card>

      <TaskOverlay
        id={selectedTaskId}
        visible={visible}
        onHide={() => {
          setVisible(false);
          setSelectedTaskId("");
          refreshTasks();
        }}
      />
    </div>
  );
};
