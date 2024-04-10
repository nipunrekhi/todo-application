import { InputValue } from "@/interface";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface WindowProps {
    handleSaveTodo: () => void;
    setInputValue: (inputValue: InputValue) => void;
    inputValue: InputValue;
    item: string;

}

export const Window: React.FC<WindowProps> = ({ handleSaveTodo, inputValue, setInputValue, item }) => {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-full flex gap-3 flex-col">
                <h3 className="font-bold text-md font-serif ">Add Todo</h3>
                <Input
                    type="text"
                    placeholder="Type here"
                    value={inputValue.title}
                    onChange={(e) => setInputValue({ ...inputValue, title: e.target.value, type: item })}
                    className=" w-full  space-x-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="modal-action flex">
                    <Button onClick={handleSaveTodo}>Add Todo</Button>
                    <Button onClick={() => {
                        const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null
                        if (modal) modal.close();
                    }}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </dialog>
    )
}
