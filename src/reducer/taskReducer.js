export default function taskReducer(state = { tasks:[
        {id:1,tittle:"task1",status:"open"},
        {id:2,tittle:"task2",status:"completed"},
        {id:3,tittle:"task3",status:"inprogress"},
        {id:4,tittle:"task4",status:"inprogress"},
        {id:5,tittle:"task5",status:"open"},

    ]}, action) {
    switch (action.type) {
        case 'addTask':
            let tasks =state.tasks
            action.payload.id=tasks.length+1
            tasks.push(action.payload)
            return {...state,tasks}
        case 'deleteTask':
            let filter =state.tasks.filter((item)=>{
                return item.id!==action.payload
            })
            return {...state,tasks:filter}
        case 'changeTask':
            let a =state.tasks.map((item)=>{
                if(item.id===action.payload.id){
                    return  state.tasks[action.payload.id-1]=action.payload;
                }
                return item
            })
            return {...state,tasks:a}
        default:
            return state
    }
}