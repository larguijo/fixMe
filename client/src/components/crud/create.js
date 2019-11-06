import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { RenderFields } from '../../helpers/renderFields';
import M from 'materialize-css';
import { withRouter } from 'react-router-dom';
const EXCLUDED_VALIDATION_FIELDS = ['id', 'createdAt', 'updatedAt'];

const Create = ({ match: { params: urlParams }, history, entity: passedEntity, mode }) => {
  const [entityFields, setEntityFields] = useState();
  const [entity] = useState(passedEntity || urlParams.entity);
  const [entityId] = useState(urlParams.id);
  const [entityValues, setEntityValues] = useState();
  const [projectId] = useState(urlParams.projectId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [formMode] = useState(mode ? mode.toUpperCase() : null);
  const dispatch = useDispatch();
  const nextPath = urlParams.projectId ? `/project/${projectId}` : '/';

  /**
   * Calls BackEnd to get the fields to be rendered in the form.
   */
  const getEntity = async () => {
    setIsLoading(true);
    const res = await axios.get(`/api/${entity}/define${projectId ? `?projectId=${projectId}` : null}`);
    if (formMode === 'EDIT') {
      const res2 = await axios.get(`/api/${entity}/${entityId}`);
      setEntityValues(res2.data);
    }
    setEntityFields(res.data);
    setIsLoading(false);
  }

  /**
   * Code invoked when submit button is clicked or form is submitted.
   * It connects to the DB to either create or update a resource.
   * @param {Object} values An object with key and values that will be submitted to the
   * backend service.
   */
  const onSubmit = async (values) => {
    try {
      console.log('values', values);
      setErrorMessage(null);
      setIsLoading(true);
      if (entityId) {
        await axios.put(`/api/${entity}/${entityId}`, values);
      } else {
        await axios.post(`/api/${entity}`, values);
      }
      setIsLoading(false);
      console.log('history', history);
      history.goBack();
    } catch (error) {
      setErrorMessage(error.response.data);
      setIsLoading(false);
    }
  }

  /**
   * Makes validation on the form before it is submitted or when the fields are touched.
   * @param {Object} values An object of key values that will be tested against model conditions.
   */
  const validate = (values) => {
    const { attributes } = entityFields;
    let errors = {};

    Object.keys(attributes).forEach(key => {
      if (!EXCLUDED_VALIDATION_FIELDS.includes(key) && !attributes.allowNull && !values[key]) {
        errors[key] = 'Requerido';
      }
    })

    return errors;
  }

  /***
   * If CREATING new entity, Gets initial values based on metadata configuration.
   * If UPDATING, Gets the values from DB and populates them as initial values.
   * 
   */
  const getDefaultValues = () => {
    if (entityId) {
      return entityValues;
    } else {
      const defaultValues = { projectId };
      const { attributes } = entityFields;
      Object.keys(attributes).forEach(key => {
        if (attributes[key].defaultValue) {
          defaultValues[key] = attributes[key].defaultValue;
        }
      });
      return defaultValues;
    }
    return null;
  }

  useEffect(() => {
    getEntity();
    M.AutoInit();
  }, []);

  return (
    <React.Fragment>
      <h3 className="header">{`${formMode === 'EDIT' ? 'Modificar' : 'Crear'} ${entity}`}</h3>
      {entityFields &&
        (<Formik
          key="2"
          className="row"
          onSubmit={onSubmit}
          validate={validate}
          initialValues={getDefaultValues()}
          render={
            ({ setFieldValue }) => (
              <Form className="col s12">
                <RenderFields entity={entity} fields={entityFields} setFieldValue={setFieldValue} formMode={formMode} />
                <button className="btn waves-effect waves-light right" type="submit" name="action">
                  Submit
                <i className="material-icons right">send</i>
                </button>
                <button
                  className="yellow darken-3 white-text btn-flat"
                  onClick={() => history.push(nextPath)}
                >Back</button>
                {errorMessage && errorMessage.errors && <div>{errorMessage.errors[0].message}</div>}
              </Form>
            )
          }
        >
        </Formik >)
      }
      {isLoading && (<div className="progress">
        <div className="indeterminate"></div>
      </div>)}
    </React.Fragment>
  )
}

export default withRouter(Create);