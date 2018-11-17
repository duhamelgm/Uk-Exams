import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import PropTypes from "prop-types";
import {
  updateCourse,
  getCourse,
  addCourse
} from "../../../actions/courseActions";
import classnames from "classnames";
import * as XLSX from "xlsx";

import CourseInfo from "./EditCourseComponents/CourseInfo";
import CoursePlans from "./EditCourseComponents/CoursePlans";
import CourseCategories from "./EditCourseComponents/CourseCategories";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from "reactstrap";
import { Accordion } from "../../common/Accordion";

class EditCourse extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: "1",
      title: "",
      smalldescription: "",
      description: "",
      handle: "",
      plans: [
        {
          title: "",
          frequency: "",
          interval: "",
          price: ""
        }
      ],
      categories: [
        {
          title: "",
          category: "",
          questions: [{}]
        }
      ],
      msg: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getCourse(this.props.match.params.handle);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.course !== prevProps.course) {
      if (this.props.course.course !== prevProps.course.course) {
        let newPlans = this.props.course.course.plans.map(plan => {
          return {
            title: plan.title,
            frequency: plan.frequency,
            interval: plan.interval,
            price: plan.price
          };
        });

        this.setState({
          handle: this.props.course.course.handle,
          title: this.props.course.course.title,
          description: this.props.course.course.description,
          plans: newPlans
        });
      }
    }

    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  handleFileUpload = id => e => {
    const f = e.target.files[0];
    const ext = f.name.slice(((f.name.lastIndexOf(".") - 1) >>> 0) + 2);

    console.log(ext);

    if (ext !== "xlsx") {
    } else {
      const reader = new FileReader();
      reader.onload = evt => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {});
        /* Update state */

        for (let i = 0; i < data.length; i++) {
          let answer = data[i]["Right Answer"];
          if (answer) {
            data[i]["Right Answer"] = answer.toUpperCase();
          }

          delete Object.assign(data[i], {
            answerOption: data[i]["Right Answer"]
          })["Right Answer"];

          delete Object.assign(data[i], {
            question: data[i]["Question"]
          })["Question"];

          delete Object.assign(data[i], {
            optionA: data[i]["Option A"]
          })["Option A"];
          delete Object.assign(data[i], {
            optionB: data[i]["Option B"]
          })["Option B"];
          delete Object.assign(data[i], {
            optionC: data[i]["Option C"]
          })["Option C"];
          delete Object.assign(data[i], {
            optionD: data[i]["Option D"]
          })["Option D"];
          delete Object.assign(data[i], {
            optionE: data[i]["Option E"]
          })["Option E"];

          delete Object.assign(data[i], {
            answerDescription: data[i]["Description"]
          })["Description"];
          data[i].row = data[i].__rowNum__;
        }

        const newCategory = this.state.categories.map((category, idx) => {
          if (id !== idx) return category;
          return { ...category, questions: data };
        });

        this.setState({
          categories: newCategory
        });
      };
      reader.readAsBinaryString(f);
    }
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  addToArray = target => e => {
    this.setState({
      plans:
        target === "plans"
          ? this.state.plans.concat([
              {
                title: "",
                frequency: "",
                interval: "",
                price: ""
              }
            ])
          : this.state.plans,
      categories:
        target === "categories"
          ? this.state.categories.concat([
              {
                title: "",
                category: "",
                questions: [{}]
              }
            ])
          : this.state.categories
    });
  };

  removeFromArray = (id, target) => e => {
    this.setState({
      plans: this.state.plans.filter(
        (s, sid) => id !== sid || target !== "plans"
      ),
      categories: this.state.categories.filter(
        (s, sid) => id !== sid || target !== "categories"
      )
    });
  };

  onChangeArray = (id, target) => e => {
    const newPlans = this.state.plans.map((plan, idx) => {
      if (id !== idx || target !== "plans") return plan;
      return { ...plan, [e.target.name]: e.target.value };
    });

    const newCategories = this.state.categories.map((category, idx) => {
      if (id !== idx || target !== "categories") return category;
      return { ...category, [e.target.name]: e.target.value };
    });

    this.setState({
      plans: newPlans,
      categories: newCategories
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newCourse = {
      title: this.state.title,
      smalldescription: this.state.smalldescription,
      description: this.state.description,
      handle: this.state.handle,
      plans: this.state.plans,
      categories: this.state.categories
    };

    if (this.props.match.params.handle) {
      this.props.updateCourse(newCourse, this.props.match.params.handle);
    } else {
      this.props.addCourse(newCourse);
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <Container className="my-4">
        <Row>
          <Col lg="8">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                  className="cursor-pointer"
                >
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                  className="cursor-pointer"
                >
                  Subscription plans
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                  className="cursor-pointer"
                >
                  Questions categories
                </NavLink>
              </NavItem>
            </Nav>
            <form onSubmit={this.onSubmit}>
              <TabContent activeTab={this.state.activeTab} className="my-4">
                <TabPane tabId="1">
                  <CourseInfo
                    state={this.state}
                    onChange={this.onChange}
                    errors={errors}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <CoursePlans
                    state={this.state}
                    errors={errors}
                    onChangePlan={id => this.onChangeArray(id, "plans")}
                    removeSubscription={id => this.removeFromArray(id, "plans")}
                    addSubscription={this.addToArray("plans")}
                  />
                </TabPane>
                <TabPane tabId="3">
                  <CourseCategories
                    state={this.state}
                    errors={errors}
                    onChangeCategory={id =>
                      this.onChangeArray(id, "categories")
                    }
                    removeCategory={id =>
                      this.removeFromArray(id, "categories")
                    }
                    addCategory={this.addToArray("categories")}
                    handleFileUpload={id => this.handleFileUpload(id)}
                  />
                </TabPane>
              </TabContent>

              <button className="btn btn-lg btn-secondary" type="submit">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

EditCourse.propTypes = {
  updateCourse: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProptypes = state => ({
  auth: state.auth,
  course: state.course,
  errors: state.errors
});

export default connect(
  mapStateToProptypes,
  { updateCourse, getCourse, addCourse }
)(EditCourse);
