import React from "react";
import { Sidebar } from "primereact/sidebar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

import { Comment, Task, User } from "../services/types";
import { userService } from "../services/userService";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { taskService } from "../services/taskService";

export const TaskOverlay = ({
  visible,
  onHide,
  id = "",
}: {
  visible: boolean;
  onHide: () => void;
  id?: string;
}) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [task, setTask] = React.useState<Task>({} as Task);
  const [currentUser, setCurrentUser] = React.useState<User>({} as User);
  const [draftComment, setDraftComment] = React.useState("");

  React.useEffect(() => {
    (async () => {
      if (id) {
        const [task, error] = await taskService.getTask({ taskId: id });
        if (error) {
          console.error(error);
        }

        setTask(task!);
      } else {
        users?.forEach((user) => {
          if (String(user.id) === localStorage.getItem("userID")) {
            setCurrentUser(user);
            setTask({ createdBy: user } as Task);
          }
        });
      }
    })();
  }, [id, users]);

  React.useEffect(() => {
    (async () => {
      const [users, error] = await userService.getAllUsers();
      if (error) {
        console.error(error);
      }
      setUsers(users!);

      users?.forEach((user) => {
        if (String(user.id) === localStorage.getItem("userID")) {
          setCurrentUser(user);
          setTask({ ...task, createdBy: user });
        }
      });
    })();
  }, []);

  const handleCreate = async () => {
    if (id) {
      const [updatedTask, error] = await taskService.updateTask({
        task: task,
      });
      if (error) {
        console.error(error);
      }

      setTask(updatedTask!);
    } else {
      const [createdTask, error] = await taskService.createTask({ task });
      if (error) {
        console.error(error);
      }

      setTask(createdTask!);
    }

    onHide();
  };

  const handlePostComment = async () => {
    const comment = {
      content: draftComment,
      createdBy: currentUser,
    } as Comment;

    const [postedComment, error] = await taskService.postComment({
      comment,
      taskId: String(task.id),
    });
    if (error) {
      console.error(error);
    }

    setTask({ ...task, comments: [...task.comments, postedComment!] });
    setDraftComment("");
  };

  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={onHide}
      style={{ width: "30rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Checkbox
          inputId="binary"
          onChange={(e) => {
            setTask({ ...task, status: e.checked ? "Done" : "wip" });
          }}
          checked={task.status === "Done"}
        />
        <div
          style={{
            marginLeft: "1rem",
          }}
        >
          Mark Complete
        </div>
      </div>
      <input
        type="text"
        className="p-inputtext"
        placeholder="Enter Title...."
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          borderRadius: "0.5rem",
          padding: "0",
          fontSize: "1.5rem",
          marginBottom: "2rem",
        }}
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "50px",
          }}
        >
          <span>Assignee</span>
          <div
            style={{
              width: "40%",
            }}
          >
            <Dropdown
              style={{ width: "100%" }}
              value={task.assignee}
              options={users}
              onChange={(e) => setTask({ ...task, assignee: e.value })}
              optionLabel="name"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "50px",
          }}
        >
          <span>Due Date</span>
          <div
            style={{
              width: "40%",
            }}
          >
            <Calendar
              value={task.dueDate ? moment(task.dueDate).toDate() : undefined}
              onChange={(e) =>
                setTask({
                  ...task,
                  dueDate: moment(e.target.value?.toString()).format(
                    "YYYY-MM-DD hh:mm:ss"
                  ),
                })
              }
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "50px",
          }}
        >
          <span>Created By</span>
          <span>{currentUser.name}</span>
        </div>

        <div>
          <span>Description</span>
          <span></span>
        </div>
      </div>
      <textarea
        className="p-inputtext"
        placeholder="Enter Description...."
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          borderRadius: "0.5rem",
          padding: "0",
          fontSize: "1rem",
          marginBottom: "1rem",
          width: "100%",
          resize: "none",
          height: "20rem",
          lineHeight: "1.5",
        }}
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <Button
        label="Save Task"
        style={{
          width: "100%",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
        }}
        onClick={handleCreate}
        disabled={task.title === undefined || task.title === ""}
      />

      {task.id !== undefined && (
        <>
          <div
            style={{
              height: "30rem",
              overflowY: "scroll",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Comments
            </div>

            {task.comments?.map((comment) => (
              <div
                key={comment.id}
                style={{
                  display: "flex",
                  backgroundColor: "#f5f5f5",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1.2rem",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {comment.createdBy.name}
                  </span>
                  <span>{moment(comment.createdAt).format("yyyy/MM/DD")}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {comment.content}
                </div>
              </div>
            ))}
          </div>

          <InputTextarea
            rows={5}
            placeholder="Enter Comment..."
            style={{
              width: "100%",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
            autoResize={true}
            value={draftComment}
            onChange={(e) => setDraftComment(e.target.value)}
          />
          <Button
            label="Add Comment"
            onClick={handlePostComment}
            style={{
              width: "100%",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          />
        </>
      )}
    </Sidebar>
  );
};
