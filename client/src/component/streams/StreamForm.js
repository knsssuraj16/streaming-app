import React from "react";
import { Form, Field } from "react-final-form";
// class StreamForm extends React.Component {
//   createInput({ input, label, meta }) {
//     // console.log(meta);
//     const clsname = `field ${meta.touched && meta.error ? "error" : ""}`;
//     return (
//       <div className={clsname}>
//         <label>{label}</label>
//         <input {...input} autoComplete="off" />
//         {meta.touched && meta.touched && (
//           <div className="ui error">
//             <div className="header">{meta.error}</div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   onSubmit = (formValues) => {
//     this.props.onSubmit(formValues);
//     // console.log(formValues);
//   };

//   render() {
//     return (
//       <form
//         onSubmit={this.props.handleSubmit(this.onSubmit)}
//         className="ui form error"
//       >
//         <Field
//           name="title"
//           component={this.createInput}
//           label={"Enter the title"}
//         />
//         <Field
//           name="description"
//           component={this.createInput}
//           label="Enter the description"
//         />

//         <button className="ui button primary"> Submit</button>
//       </form>
//     );
//   }
// }
// const validate = (formValues) => {
//   const errors = {};
//   if (!formValues.title) {
//     errors.title = "you must enter a title";
//   }
//   if (!formValues.description) {
//     errors.description = "you must enter a description";
//   }

//   return errors;
// };

// export default reduxForm({ form: "StreamForm", validate })(StreamForm);

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => {
        const errors = {};

        if (!formValues.title) {
          errors.title = "You must enter a title";
        }

        if (!formValues.description) {
          errors.description = "You must enter a description";
        }

        return errors;
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <Field name="title" component={renderInput} label="Enter Title" />
          <Field
            name="description"
            component={renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  );
};

export default StreamForm;
