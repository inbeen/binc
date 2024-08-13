import './index.scss';

export interface TriggerProps {
  name: string;
  value?: string;
  className?: string;
}

const Trigger = (props: TriggerProps) => {
  const { name } = props;
  return (
    <div className="binc-select-trigger">
      <div className="binc-select-trigger__wrapper">
        <div className="binc-select-trigger__prefix"></div>
        <div className="binc-select-trigger__content">{name}</div>
        <div className="binc-select-trigger__suffix"></div>
      </div>
    </div>
  );
};

export default Trigger;
