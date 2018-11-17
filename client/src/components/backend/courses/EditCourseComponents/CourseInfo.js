import React from "react";
import PropTypes from "prop-types";

import TextFieldGroup from "../../../common/TextFieldGroup";

const CourseInfo = ({ state, onChange, errors }) => {
  return (
    <div>
      <TextFieldGroup
        name="title"
        placeholder="Title of the course"
        value={state.title}
        onChange={onChange}
        error={errors.title}
      />

      <TextFieldGroup
        type="textarea"
        name="smalldescription"
        placeholder="Small description"
        value={state.smalldescription}
        onChange={onChange}
        error={errors.smalldescription}
        info={"A small description that will be displayed on the home page"}
      />

      <TextFieldGroup
        type="textarea"
        name="description"
        placeholder="Description"
        value={state.description}
        onChange={onChange}
        error={errors.description}
      />

      <TextFieldGroup
        name="handle"
        placeholder="Handle of the course"
        value={state.handle}
        onChange={onChange}
        error={errors.handle}
        info={
          'The title that will be displayed in the link, "www.uk-exams.com/courses/handleofthiscourse" '
        }
      />
    </div>
  );
};

CourseInfo.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default CourseInfo;
