import React, { useState } from "react";
import MatButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import { FormGroup, Label, Form } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { useHistory } from "react-router-dom";
import { FaPlus, FaAngleDown } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import { Modal } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";


library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .card-title": {
      color: "#fff",
      fontWeight: "bold",
    },
    "& .form-control": {
      borderRadius: "0.25rem",
      height: "41px",
    },
    "& .card-header:first-child": {
      borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0",
    },
    "& .dropdown-toggle::after": {
      display: " block !important",
    },
    "& select": {
      "-webkit-appearance": "listbox !important",
    },
    "& p": {
      color: "red",
    },
    "& label": {
      fontSize: "14px",
      color: "#014d88",
      fontWeight: "bold",
    },
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
  error: {
    color: "#f85032",
    fontSize: "12.8px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const Tetanus = (props) => {
  const [clientDetails, setClientDetails] = useState({
    dateOfClientVisit: "",
    clientCardNo: "",
    clientDob: "",
    clientName: "",
    clientFollowUpAddress: "",
    clientPhoneNumber: "",
  });

  const [tetanusDiphtheria] = useState({
    basicInfo: "",
    td1: "",
    td2: "",
    td3: "",
    td4: "",
    td5: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const [saving] = useState(false);
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);
  const [showContactCard, setShowContactCard] = useState(true);
  const onClickContactCard = () => {
    setShowContactCard(!showContactCard);
  };
  // eslint-disable-next-line no-unused-vars
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownOptions = [
    {
      id: 1,
      name: "P",
    },
    { name: "NP", id: 2 },
  ];
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleCancel = () => {
    history.push({ pathname: "/" });
  };

  const classes = useStyles();

  const handleInputChangeClientDetails = (e) => {
    setErrors({ ...temp, [e.target.name]: "" });
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value });
  };

  let temp = { ...errors };

  return (
    <>
      <CardContent>
        <div className="col-xl-12 col-lg-12">
          <Form>
            <div className="card">
              <div className="basic-form">
                <div></div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                  borderRadius: "0.2rem",
                }}
              >
                <h5 className="card-title" style={{ color: "#fff" }}>
                  {" "}
                  National Health Management Information System Child
                  Immunization Register
                </h5>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="form-group mb-3 col-md-4">
                    <Label>Date Of Client Visit</Label>
                    <input
                      className="form-control"
                      type="date"
                      name="dateOfClientVisit"
                      id="dateOfClientVisit"
                      value={clientDetails.dateOfClientVisit}
                      onChange={handleInputChangeClientDetails}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.2rem",
                      }}
                    />
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Client Card No </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="clientCardNo"
                        id="clientCardNo"
                        value={clientDetails.clientCardNo}
                        onChange={handleInputChangeClientDetails}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>Client Name </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="clientName"
                        value={clientDetails.clientName}
                        id="childCardNo"
                        onChange={handleInputChangeClientDetails}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>
                        Client Date Of Birth{" "}
                        <span style={{ color: "red" }}> *</span>
                      </Label>
                      <input
                        className="form-control"
                        type="date"
                        name="clientDob"
                        id="clientDob"
                        onChange={handleInputChangeClientDetails}
                        value={clientDetails.clientDob}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.clientDob !== "" ? (
                        <span className={classes.error}>{errors.vaccine}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>
                        {" "}
                        Client Follow Up Address
                        <span style={{ color: "red" }}> *</span>
                      </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="clientFollowUpAddress"
                        id="clientFollowUpAddress"
                        onChange={handleInputChangeClientDetails}
                        value={clientDetails.clientFollowUpAddress}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      ></input>
                      {errors.clientFollowUpAddress !== "" ? (
                        <span className={classes.error}>{errors.sexId}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label>
                        {" "}
                        Client Phone Number{" "}
                        <span style={{ color: "red" }}> *</span>
                      </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="clientPhoneNumber"
                        id="clientPhoneNumber"
                        onChange={handleInputChangeClientDetails}
                        value={clientDetails.clientPhoneNumber}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.clientPhoneNumber !== "" ? (
                        <span className={classes.error}>
                          {errors.vaccineDate}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                  borderRadius: "0.2rem",
                }}
              >
                <h5 className="card-title" style={{ color: "#fff" }}>
                  Tetanus Diphtheria{" "}
                </h5>
                {showContactCard === false ? (
                  <>
                    <span
                      className="float-end"
                      style={{ cursor: "pointer" }}
                      onClick={onClickContactCard}
                    >
                      <FaPlus />
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="float-end"
                      style={{ cursor: "pointer" }}
                      onClick={onClickContactCard}
                    >
                      <FaAngleDown />
                    </span>{" "}
                  </>
                )}
              </div>
              {showContactCard && (
                <div className="card-body">
                  <div className={"row"}>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          TD 1 <span style={{ color: "red" }}> *</span>
                        </Label>
                        <select
                          className="form-control"
                          type="dropdown"
                          name="tp1"
                          id="tp1"
                          value={tetanusDiphtheria.selectedOption}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          onChange={handleDropdownChange}
                        >
                          <option value="">Select</option>
                          {dropdownOptions.map((value, index) => (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {errors.tp1 !== "" ? (
                          <span className={classes.error}>{errors.tp1}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group col-md-4">
                      <FormGroup>
                        <Label>
                          TD 2 <span style={{ color: "red" }}> *</span>
                        </Label>
                        <select
                          className="form-control"
                          type="dropdown"
                          name="tp2"
                          id="tp2"
                          value={tetanusDiphtheria.selectedOption}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          onChange={handleDropdownChange}
                        >
                          <option value="">Select</option>
                          {dropdownOptions.map((value, index) => (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {errors.tp1 !== "" ? (
                          <span className={classes.error}>{errors.tp1}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group col-md-4">
                      <FormGroup>
                        <Label>
                          TD 3 <span style={{ color: "red" }}> *</span>
                        </Label>
                        <select
                          className="form-control"
                          type="dropdown"
                          name="tp3"
                          id="tp3"
                          value={tetanusDiphtheria.selectedOption}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          onChange={handleDropdownChange}
                        >
                          <option value="">Select</option>
                          {dropdownOptions.map((value, index) => (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {errors.tp3 !== "" ? (
                          <span className={classes.error}>{errors.tp1}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          TD 4 <span style={{ color: "red" }}> *</span>
                        </Label>
                        <select
                          className="form-control"
                          type="dropdown"
                          name="tp4"
                          id="tp4"
                          value={tetanusDiphtheria.selectedOption}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          onChange={handleDropdownChange}
                        >
                          <option value="">Select</option>
                          {dropdownOptions.map((value, index) => (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {errors.tp4 !== "" ? (
                          <span className={classes.error}>{errors.tp4}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          TD 5 <span style={{ color: "red" }}> *</span>
                        </Label>
                        <select
                          className="form-control"
                          type="dropdown"
                          name="tp5"
                          id="tp5"
                          value={tetanusDiphtheria.selectedOption}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          onChange={handleDropdownChange}
                        >
                          <option value="">Select</option>
                          {dropdownOptions.map((value, index) => (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {errors.tp5 !== "" ? (
                          <span className={classes.error}>{errors.tp5}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Comment <span style={{ color: "red" }}> *</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="comment"
                          id="comment"
                          value={tetanusDiphtheria.selectedOption}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          //onChange={handleInputChangeBasic}
                        />

                        {errors.comment !== "" ? (
                          <span className={classes.error}>
                            {errors.comment}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <br />
            <MatButton
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SaveIcon />}
              //onClick={handleSubmit}
              //disabled={disabledAgeBaseOnAge}
              style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
            >
              {!saving ? (
                <span style={{ textTransform: "capitalize" }}>Save</span>
              ) : (
                <span style={{ textTransform: "capitalize" }}>Saving...</span>
              )}
            </MatButton>

            <MatButton
              variant="contained"
              className={classes.button}
              startIcon={<CancelIcon />}
              style={{ backgroundColor: "#992E62" }}
              onClick={handleCancel}
            >
              <span style={{ textTransform: "capitalize", color: "#fff" }}>
                Cancel
              </span>
            </MatButton>
          </Form>
        </div>
      </CardContent>
      {/* </Card> */}
      <Modal
        show={open}
        toggle={toggle}
        className="fade"
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Notification!
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
                    <h4>Are you Sure of the Age entered?</h4>
                    
                </Modal.Body> */}
        <Modal.Footer>
          <Button
            onClick={toggle}
            style={{ backgroundColor: "#014d88", color: "#fff" }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    //</Form>
    //</div>
    //</CardContent>
    //</Card>
    //</>
  );
};

export default Tetanus;
