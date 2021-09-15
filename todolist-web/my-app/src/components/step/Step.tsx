import { ListItem, TextField, ListItemSecondaryAction, makeStyles, Theme,createStyles} from "@material-ui/core"
import { RadioButtonUnchecked, CheckCircle, Clear } from "@material-ui/icons"
import { useRef } from "react";
import { useAppDispatch } from "../../redux/hook";
import { DeleteStepById, UpdateStepById } from "../../redux/stepSlice";
import { step,Todo} from "../../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepIcon: {
        marginRight: theme.spacing(1),
      },
      deleteButton: {
        cursor: "pointer",
      },
  })
);

interface StepProps{
    step: step
    currentTodo:Todo
}
const Step:React.FC<StepProps> = ({step,currentTodo})=>{
    console.log("1211313")
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const updateStepRef = useRef<HTMLInputElement>(null)
    const completeStep = () => {
        console.log("123")  
        const updateStep = {
          id: step.id,
          title:step.title,
          completed:!step.completed,
          todoItem:currentTodo
        };
        dispatch(UpdateStepById(updateStep));
    };
    const deleteStep = () => {
      console.log(step.id)
       dispatch(DeleteStepById(step.id));
    };
    const onKeyPressUpdateStep  = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          updateStep();
        }
      };
    const updateStep = ()=>{
        if (updateStepRef.current != null) {
            if (updateStepRef.current.value.trim() !== "") {
                dispatch(UpdateStepById({id:step.id,title:updateStepRef.current.value.trim(),completed:step.completed}))
            }
        }
    }
    return (
        <ListItem button divider key={step.id}>
              {step.completed === false ? (
                <RadioButtonUnchecked
                  onClick={() => completeStep()}
                  className={classes.stepIcon}
                  style={{ color: "tomato" }}
                />
              ) : (
                <CheckCircle
                  onClick={() => completeStep()}
                  className={classes.stepIcon}
                  style={{ color: "tomato" }}
                />
              )}
              <TextField
                defaultValue={step.title}
                onKeyPress={(e) => onKeyPressUpdateStep(e)}
                inputRef = {updateStepRef}
                onBlur={() => updateStep()}
                // value={step.title}
                fullWidth={true}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <ListItemSecondaryAction
                onClick={() => deleteStep()}
                className={classes.deleteButton} 
              >
                <Clear />
              </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Step