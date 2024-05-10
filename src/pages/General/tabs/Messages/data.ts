export const data = [
    {
        idUser: 1,
        name: "Иван Иванов",
        message: "Привет, работа выполнена."
    },
    {
        idUser: 2,
        name: "Петр Петров",
        message: "Хорошая успеваемость!"
    },
    {
        idUser: 3,
        name: "Владимир Владимиров",
        message: "Выложили новую задачу."
    }
]

export const correspondences = [
    {
        idUser: 1,
        correspondence: [{type: "from", mes: "Привет."}, {type: "from", mes: "Как успехи с работой ?"}, {type: "to", mes: "Привет, работа выполнена."}]
    },
    {
        idUser: 2,
        correspondence: [{type: "from", mes: "Хорошая успеваемость."}]
    },
    {
        idUser: 3,
        correspondence: [{type: "from", mes: "Выложили новую задачу."}]
    }
]