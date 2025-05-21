import { useState } from 'react';
import './App.css';

function Formulario({ agregarDatosEmpleado }) {
  const [newEmpleado, setNewEmpleado] = useState({
    nombre_del_empleado: '',
    sector: '',
    pedidos: [{ gusto: '', cantidad: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmpleado({
      ...newEmpleado,
      [name]: value,
    });
  };

  const handlePedidoChange = (index, e) => {
    const { name, value } = e.target;
    const nuevosPedidos = [...newEmpleado.pedidos];
    nuevosPedidos[index][name] = value;
    setNewEmpleado({ ...newEmpleado, pedidos: nuevosPedidos });
  };

  const agregarPedido = () => {
    setNewEmpleado({
      ...newEmpleado,
      pedidos: [...newEmpleado.pedidos, { gusto: '', cantidad: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    agregarDatosEmpleado(newEmpleado);
    setNewEmpleado({
      nombre_del_empleado: '',
      sector: '',
      pedidos: [{ gusto: '', cantidad: '' }],
    });
  };

  const validarFormulario = () => {
    const { nombre_del_empleado, sector, pedidos } = newEmpleado;
    if (nombre_del_empleado.trim() === '' || sector.trim() === '') {
      alert('Nombre y sector son obligatorios');
      return false;
    }

    for (let pedido of pedidos) {
      if (
        pedido.gusto.trim() === '' || pedido.cantidad.trim() === '' || parseInt(pedido.cantidad) <= 0
      ) {
        alert('Todos los gustos y cantidades deben estar completos y ser válidos');
        return false;
      }
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre del empleado</label>
      <input
        type="text"
        name="nombre_del_empleado"
        className="u-full-width"
        placeholder="Nombre del empleado"
        value={newEmpleado.nombre_del_empleado}
        onChange={handleChange}
      />

      <label>Sector</label>
      <select
        name="sector"
        className="u-full-width"
        value={newEmpleado.sector}
        onChange={handleChange}
      >
        <option value="">Seleccione un sector</option>
        <option value="gestion">Gestión</option>
        <option value="finanzas">Finanzas</option>
        <option value="recursos_humanos">Recursos Humanos</option>
        <option value="marketing">Marketing</option>
        <option value="programacion">Programación</option>
      </select>

      {newEmpleado.pedidos.map((pedido, index) => (
        <div key={index}>
          <label>Selector de gustos #{index + 1}</label>
          <select
            name="gusto"
            className="u-full-width"
            value={pedido.gusto}
            onChange={(e) => handlePedidoChange(index, e)}
          >
            <option value="">Seleccione un gusto de empanada</option>
            <option value="CarneCortadaAlcuchillo">Carne cortada al cuchillo</option>
            <option value="CarneSuave">Carne suave</option>
            <option value="Verdura">Verdura</option>
            <option value="QTeImportaVasquitoMitico">Q te importa vasquito</option>
            <option value="jamonYqueso">Jamón y queso</option>
          </select>

          

          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            className="u-full-width"
            placeholder="Cantidad"
            value={pedido.cantidad}
            onChange={(e) => handlePedidoChange(index, e)}
          />
        </div>
      ))}

      <button type="button" onClick={agregarPedido} className="u-full-width">
        + Agregar otra empanada
      </button>

      <button type="submit" className="u-full-width button-primary">
        Agregar Pedido
      </button>
    </form>
  );
}
const formatearGusto = (clave) => {
  switch (clave) {
    case 'CarneCortadaAlcuchillo':
      return 'Carne cortada al cuchillo';
    case 'CarneSuave':
      return 'Carne suave';
    case 'Verdura':
      return 'Verdura';
    case 'jamonYqueso':
      return 'Jamón y queso';
    case 'QTeImportaVasquitoMitico':
      return 'Q te importa vasquito';
    default:
      return clave;
  }
};


function App() {
  const [empleados, setEmpleados] = useState([]);

  const agregarDatosEmpleado = (empleado) => {
    setEmpleados([...empleados, empleado]);
    console.log("Empleado agregado:", empleado);
  };

  return (
    <div className="App">

<h2>Total de empanadas por gusto</h2>
<ul>
  {Object.entries(
    empleados.reduce((acumulador, empleado) => {
      empleado.pedidos.forEach((pedido) => {
        const gusto = pedido.gusto;
        const cantidad = parseInt(pedido.cantidad) || 0;
        acumulador[gusto] = (acumulador[gusto] || 0) + cantidad;
      });
      return acumulador;
    }, {})
  ).map(([gusto, total], index) => (
    <li key={index}>
      {formatearGusto(gusto)}: {total} empanadas
    </li>
  ))}
</ul>



      <h1>Pedido de Empanadas</h1>
      <Formulario agregarDatosEmpleado={agregarDatosEmpleado} />
      <h2>Pedidos realizados:</h2>
      <ul>
        {empleados.map((empleado, index) => (
          <li key={index}>
            <strong>{empleado.nombre_del_empleado}</strong> ({empleado.sector}):<br />
            {empleado.pedidos.map((pedido, i) => (
              <div key={i}>
                {pedido.cantidad} empanadas de {pedido.gusto}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
//prueba para un git commit
export default App;
