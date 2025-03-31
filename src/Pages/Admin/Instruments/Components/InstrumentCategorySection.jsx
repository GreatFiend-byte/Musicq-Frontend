import React from "react";
import Card from "../../../../ComponentsUI/Card";
import Button from "../../../../ComponentsUI/Button";
import Typography, { Title } from "../../../../ComponentsUI/Typography";
import InstrumentTable from "./InstrumentTable";

const InstrumentCategorySection = ({ 
  category, 
  onAddInstrument, 
  onEditInstrument, 
  onDeleteInstrument,
  apiUrl
}) => (
  <Card
    title={<Title level={3} style={{ margin: 0 }}>{category.nombre}</Title>}
    style={{ marginBottom: 24 }}
    extra={
      <Button 
        type="primary" 
        onClick={() => onAddInstrument(category.id)}
      >
        Agregar Instrumento
      </Button>
    }
  >
    <InstrumentTable
      data={category.instrumentos}
      onEdit={onEditInstrument}
      onDelete={onDeleteInstrument}
      apiUrl={apiUrl}
    />
  </Card>
);

export default InstrumentCategorySection;