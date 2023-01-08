import React from "react";
import { Sidebar } from "primereact/sidebar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

export const TaskOverlay = ({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide: () => void;
}) => {
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
          onChange={(e) => console.log(e.value)}
          checked={false}
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
        value="Get Shit Done"
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
          }}
        >
          <span>Assignee</span>
          <span>Alvin Endratno</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Due Date</span>
          <span>2022/05/13</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Created By</span>
          <span>John Doe</span>
        </div>

        <div>
          <span>Description</span>
          <span></span>
        </div>
      </div>
      <textarea
        className="p-inputtext"
        placeholder="Enter Title...."
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
        value="Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi."
      />

      <div
        style={{
          height: "calc(100% - 48rem)",
          overflowY: "scroll",
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

        <div
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
              Alvin Endratno
            </span>
            <span>2022/05/13</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            This Task is too hard for me, can you help me?
          </div>
        </div>
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
      />
      <Button
        label="Add Comment"
        style={{
          width: "100%",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
        }}
      />
    </Sidebar>
  );
};
