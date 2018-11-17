import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import TextFieldGroup from "../../../common/TextFieldGroup";
import { Accordion } from "../../../common/Accordion";
import { Label, FormGroup, CustomInput, Input } from "reactstrap";

const CourseCategories = ({
  state,
  errors,
  onChangeCategory,
  removeCategory,
  addCategory,
  handleFileUpload
}) => {
  let categoriesErrors = [];

  return (
    <div>
      <Accordion>
        {state.categories.map((category, id) => {
          categoriesErrors.push({});
          if (Array.isArray(errors.categories)) {
            if (
              errors.categories.length >= id &&
              errors.categories[id] !== undefined
            ) {
              categoriesErrors[id] = errors.categories[id];
            }
          }

          return (
            <Accordion.Item key={id}>
              <Accordion.Header
                className="d-flex justify-content-between card-title mb-0"
                removeCategory={removeCategory(id)}
              >
                {category.title ? category.title : "New category"}
              </Accordion.Header>

              <Accordion.Body>
                <TextFieldGroup
                  label="The title of this category"
                  name="title"
                  placeholder="Some category"
                  value={category.title}
                  onChange={onChangeCategory(id)}
                  error={categoriesErrors[id].title}
                />

                <FormGroup>
                  <Label>Type of category</Label>
                  <CustomInput
                    id={`type${id}`}
                    type="select"
                    name="type"
                    value={category.type}
                    onChange={onChangeCategory(id)}
                    className="custom-select custom-select-lg"
                  >
                    <option value="">Select</option>
                    <option>Free demo</option>
                    <option>Standard</option>
                  </CustomInput>
                  <small className="form-text text-muted" />
                  <div className="invalid-feedback">
                    {categoriesErrors[id].type}
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Questions for this category</Label>

                  <Input
                    type="file"
                    accept=".xlsx"
                    className={classnames({
                      "is-invalid": categoriesErrors[id].price
                    })}
                    onChange={handleFileUpload(id)}
                  />
                  <div className="invalid-feedback">
                    {categoriesErrors[id].price}
                  </div>
                </FormGroup>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <div className="card">
        <div className="card-header d-flex justify-content-center align-items-center flex-column">
          <h5 className="text-danger">{errors.plan}</h5>
          <button className="btn btn-info" onClick={addCategory} type="button">
            Add new question category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCategories;
