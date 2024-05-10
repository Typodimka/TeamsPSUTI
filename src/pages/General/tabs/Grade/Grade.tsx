import React from 'react';
import {
    Box,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "../../../../mui";
import {useTheme} from "@mui/material";
import {useAppSelector} from "../../../../store/hook";


const data = [
    "Russian language",
    "Mathematics",
    "Literature",
    "History",
    "Geography",
    "Biology",
    "Physics",
    "Chemistry",
    "Computer Science",
    "Foreign language"
];




export const Grade = () => {
    const { user, language } = useAppSelector(state => state.general);

    const theme = useTheme();

    const cellStyle = {
        borderRight: `1px solid ${theme.palette.divider}`,
    };








    return (
        <Box sx={{width: "100%", height: "100%"}}>
            <Typography sx={{mt: 2, ml: 2}}>{language[ "Student's academic performance"]} 4 {language["course"]} {language["IST"]}-03:  {user?.subName} {user?.name}</Typography>

            <TableContainer component={Paper} sx={{mt: 2}}>
                <Table sx={{minWidth: 700}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={cellStyle}>{language["Items"]}</TableCell>
                            <TableCell colSpan={10} sx={cellStyle}>{language["Evaluations"]}</TableCell>
                            <TableCell sx={cellStyle}>{language["Average score"]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, i) => {
                            const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 4) + 2);

                            // Вычисляем сумму всех чисел в массиве
                            const sum = numbers.reduce((acc, curr) => acc + curr, 0);

                            // Вычисляем среднее арифметическое
                            const average = sum / numbers.length;


                            return (
                                <TableRow key={i}>

                                    <TableCell sx={cellStyle}>{language[item]}</TableCell>
                                    {numbers.map((num, index) => (
                                        <TableCell sx={cellStyle} key={index}>{num}</TableCell>
                                    ))}
                                    <TableCell sx={cellStyle}>{average}</TableCell>

                                </TableRow>
                            )
                        })}


                    </TableBody>
                </Table>
            </TableContainer>



        </Box>
    );
};

