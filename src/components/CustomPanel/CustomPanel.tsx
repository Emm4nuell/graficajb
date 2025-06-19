import { Panel, PanelProps } from 'primereact/panel';
import './CustomPanel.css';

interface CustomPanelProps extends PanelProps {}

export default function CustomPanel({ header, children, ...rest }: CustomPanelProps) {
  return (
    <Panel
      className="custom-panel"
      header={header}
      toggleable
      {...rest}
    >
      {children}
    </Panel>
  );
}
