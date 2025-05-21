import React, { useState } from "react";
import './PEDIDOSDEEMPANADAS/formulario.css';

function Formulario({ agregarDatosEmpleado }) {
  const [newEmpleado, setNewEmpleado] = useState({
    nombre_del_empleado: '',
    
  });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmpleado({
      ...newEmpleado,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    agregarDatosEmpleado(newEmpleado);
    setNewEmpleado({
      nombre_del_empleado: '',

    });
    
  };

  const validarFormulario = () => {
      const { nombre_del_empleado } = newEmpleado;
    
      if (
        nombre_del_empleado.trim() === ''     
      ) {
        alert("Todos los campos son obligatorios de completar");
        return false;
      }
      return true;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <label>Nombre Del empleado</label>
        <input
          type="text"
          name="nombre_del_empleado"
          class="u-full-width"
          placeholder="Nombre del empleado"
          value={newEmpleado.nombre_del_empleado}
          onChange={handleChange}
        />
      
      <button type="submit" class="u-full-width button-primary">
        Agregar Pedido
      </button>
      </form>
    </>
  );
}

export default Formulario;