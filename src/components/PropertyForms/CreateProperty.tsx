import CreatePropertyForm from "./CreatePropertyForm/CreatePropertyForm";


const CreateProperty = () => {
    return(<div className="h-full w-full flex flex-col justify-center items-center">
        
        <div className="w-fit border rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center pb-4">List Property</h1>
            <CreatePropertyForm />
        </div>

    </div>)
};


export default CreateProperty;