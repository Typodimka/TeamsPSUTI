import React, {useState} from 'react';
import {Box, Button, IconButton, Tooltip, Typography} from "../../../../mui";
import {UploadFile} from "../../../../components/UploadFile";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {tasks, tasksDescription} from "./dataTasks";
import {useAppSelector} from "../../../../store/hook";


interface TaskDescription {
    task: any
}

export const TaskDescription: React.FC<TaskDescription> = ({task}) => {

    const {language} = useAppSelector(state => state.general);


    const [selectFile, setSelectFile] = useState<File | null>(null)

    const sendTask = () => {
        setSelectFile(null)
        const findIndexTask = tasks.findIndex(item => item.idTask === task.idTask)
        const findIndexTaskDescription = tasksDescription.findIndex(item => item.idTask === task.idTask)

        if (findIndexTask !== undefined && findIndexTaskDescription !== undefined) {
            tasks[findIndexTask].passed = true
            tasksDescription[findIndexTaskDescription].passed = true
        }

    }

    return (
        <Box>
            <Typography sx={{mt: 2}}>
                {task.name}
            </Typography>
            <Box sx={{display: "flex", alignItems: "center", mt: 2}}>
                <Typography>
                    {language["Teacher"]}:
                </Typography>
                <Button sx={{ml: 2}}>
                    {task.teacher}
                </Button>
            </Box>


            <Box sx={{display: "flex", alignItems: "center", mt: 2}}>
                <Typography>
                    {language["Teacher"]}:
                </Typography>
                {task.passed ? (
                    <Typography sx={{ml: 2, color: "green"}}>
                        {language["Completed"]}
                    </Typography>
                ) : (
                    <Typography sx={{ml: 2, color: "red"}}>
                        {language["Not completed"]}
                    </Typography>
                )}


            </Box>

            {!task.passed && (
                <Box sx={{display: "flex", alignItems: "center", mt: 2}}>
                    <Typography>
                        {language["Submit a job"]}:
                    </Typography>
                    <Button sx={{ml: 2}}>
                        <UploadFile selectedFile={selectFile} setSelectedFile={(newFile) => setSelectFile(newFile)}/>
                    </Button>

                    {selectFile && (
                        <Tooltip title={language["Submit a job"]}>
                            <IconButton onClick={sendTask}>
                                <FileUploadIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            )}


            <Typography sx={{mt: 4}} variant="h6">
                {language["Description"]}:
            </Typography>

            <Typography sx={{mt: 2}}>
                {task.description}
            </Typography>

        </Box>
    );
};

