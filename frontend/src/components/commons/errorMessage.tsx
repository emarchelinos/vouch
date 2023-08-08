
interface IProps {
    properties?: any;
    className?: string;
    message: string
  }

export const ErrorMessage:React.FC<IProps> = (props:IProps) => {
    const {properties, className, message} = props;
    return <div {...properties} className={"text-sm text-red-800 flex justify-center " + className}>{message}</div>
    
}