import React from "react";
import { Card, CardBody, CardHeader, Collapse, Button } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";

export class Accordion extends React.Component {
  state = {
    open: this.props.open
  };

  toggleSection = index => () => {
    this.setState(({ open }) => ({
      open: index === open ? undefined : index
    }));
  };

  render() {
    return (
      <div className="accordion">
        {React.Children.map(this.props.children, (child, index) => {
          if (child.type !== AccordionItem) return null;
          return React.cloneElement(child, {
            isOpen: child.props.open || this.state.open === index,
            onClick: this.toggleSection(index)
          });
        })}
      </div>
    );
  }
}

Accordion.propTypes = {
  open: PropTypes.number
};

const AccordionItem = ({ children, isOpen, onClick }) => (
  <Card>
    {React.Children.map(children, child => {
      if (child.type === AccordionHeader) {
        return React.cloneElement(child, { onClick });
      }
      if (child.type === AccordionBody) {
        return React.cloneElement(child, { isOpen });
      }
      return null;
    })}
  </Card>
);

const AccordionHeader = ({ children, onClick, className, removeCategory }) => {
  let clases = className ? className : "";
  let contentClass = {};

  contentClass[className] = clases;

  return (
    <CardHeader className="d-flex justify-content-between">
      <Button
        color="link"
        onClick={onClick}
        style={{ width: "100%", textDecoration: "none" }}
      >
        <h5 className={classnames("card-title mb-0", contentClass)}>
          {children}
        </h5>
      </Button>
      {removeCategory ? (
        <button type="button" className="close" onClick={removeCategory}>
          <span aria-hidden="true">&times;</span>
        </button>
      ) : (
        ""
      )}
    </CardHeader>
  );
};

const AccordionBody = ({ children, isOpen }) => (
  <Collapse isOpen={isOpen}>
    <CardBody>{children}</CardBody>
  </Collapse>
);

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
