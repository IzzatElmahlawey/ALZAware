import "./report.css";
function Report() {
  return (
    <div className="Sub-Main">
      <div>
        <label className="Label">Reason</label>
        <div>
          <textArea type="text" className="Name" />
        </div>

        <label className="Label">Description</label>
        <div>
          <textArea type="text" className="Name" />
        </div>
        <div className="Download">
          <button className="Button">Download</button>
        </div>
      </div>
    </div>
  );
}

export default Report;
