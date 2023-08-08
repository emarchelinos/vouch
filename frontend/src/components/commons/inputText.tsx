interface IProps {
    properties?: any;
    className?: string;
  }

export const InputText:React.FC<IProps> = (props:IProps) => {
    const {properties, className} = props;
    const defaultStyle = 'px-4 py-3 rounded-lg w-72 bg-slate-100 border-slate-300';
    return (
        <input {...properties} className={className??defaultStyle} />
    )
}