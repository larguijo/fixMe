import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const View = ({ match: { params: urlParams }, history, entity: passedEntity }) => {
  const [entity] = useState(urlParams.entity || passedEntity);
  const [projectId] = useState(urlParams.projectId);
  const [data, setData] = useState();

  const getData = async () => {
    const res = await axios.get(`/api/${entity}${projectId ? `?projectId=${projectId}` : null}`);
    setData(res.data);
  }

  const renderTable = () => {
    if (data && data.length > 0) {
      return (
        <table className="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      )
    }
    return null;
  }

  const renderRows = () => {
    return data.map(record =>
      <tr key={`${entity}-${record.id}`}>
        <td>{record.id}</td>
        <td>{record.name}</td>
        <td>{record.description}</td>
        <td><Link to={`/project/${projectId}/${entity}/edit/${record.id}`}>Editar</Link></td>
      </tr>
    )
  };

  useEffect(() => {
    getData();
  }, []);



  return (
    <div>
      {renderTable()}
      <div className="fixed-action-btn">
        <Link to={`/project/${urlParams.projectId}/${entity}/new`} className="btn-floating btn-large blue">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default View;