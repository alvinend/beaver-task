import React from "react";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { TaskOverlay } from "./TaskOverlay";

export const Content = () => {
  const [visible, setVisible] = React.useState(false);

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
        <TabView>
          <TabPanel
            header="List"
            headerTemplate={(options) => (
              <div
                className="flex align-items-center justify-content-center px-3"
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "50px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                onClick={options.onClick}
              >
                <i className="pi pi-list" style={{ marginRight: "0.5rem" }} />{" "}
                List
              </div>
            )}
          >
            <p>
              <DataTable
                onRowClick={(e) => setVisible(true)}
                value={[
                  {
                    id: 1,
                    name: "Alvin Endratno",
                    task: "Create a new project",
                    status: "Done",
                  },
                  {
                    id: 2,
                    name: "Alvin Endratno",
                    task: "Create a new project",
                    status: "Done",
                  },
                  {
                    id: 3,
                    name: "Alvin Endratno",
                    task: "Create a new project",
                    status: "Done",
                  },
                ]}
              >
                {/* Checkbox Here */}
                <Column
                  headerStyle={{ width: "3rem", textAlign: "center" }}
                  bodyStyle={{ textAlign: "center", overflow: "visible" }}
                  body={(rowData) => {
                    return (
                      <Checkbox
                        inputId="binary"
                        onChange={(e) => console.log(e.value)}
                        checked={rowData.status === "Done" ? true : false}
                      />
                    );
                  }}
                />

                <Column field="id" header="ID" />
                <Column field="name" header="Name" />
                <Column field="task" header="Task" />
              </DataTable>
            </p>
          </TabPanel>
          <TabPanel
            header="Board"
            headerTemplate={(options) => (
              <div
                className="flex align-items-center justify-content-center px-3"
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                onClick={options.onClick}
              >
                <i
                  className="pi pi-th-large"
                  style={{ marginRight: "0.5rem" }}
                />{" "}
                Board
              </div>
            )}
          >
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
        </TabView>
      </Card>

      <TaskOverlay visible={visible} onHide={() => setVisible(false)} />
    </div>
  );
};
