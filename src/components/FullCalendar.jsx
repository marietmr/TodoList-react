import React, {useState, useEffect, useRef, useCallback} from "react";
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid" //vue par mois
import timeGridPlugin from "@fullcalendar/timegrid" // vue par semain/joour
import interactionPlugin from "@fullcalendar/interaction" //drag and drop

// import '@fullcalendar/core/index.global.css';
// import '@fullcalendar/daygrid/index.global.css';
// import '@fullcalendar/timegrid/index.global.css';


import "../App.css"

export default function CalendarComponent(){
    const [schedules, setSchedules] = useState([]);
    const [todos, setTodos] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/todos.json')
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error('Erreur lors du chargement des to do:', error))
    }, [])

    const evenement = todos.map((todo, index) => ({
        id: index.toString(),
        title: todo.text,
        start: new Date(),
        allDay: false,
    }))

    const handleDateSelect = (selectInfo) => {
        const title = prompt("Titre de la tâche ?");
        const calendarApi = selectInfo.view.calendar;
        
        calendarApi.unselect();
        
        if(title) {
            const newEvent = {
                id: String(Date.now()),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            };
            setEvents([...events, newEvent]);
        };
    };

    const handleEventClick = (clickInfo) => {
        if(confirm(`Supprimer "${clickInfo.event.title}" ?`)){
            setEvents(events.filter((e) => e.id !== clickInfo.event.id));
        }
    };

    const handleEventChange = (changeInfo) => {
        const updatedEvent = changeInfo.event;
        setEvents((prev) =>
            prev.map((e) =>
                e.id === updatedEvent.id
            ? {
                ...e,
                start: updatedEvent.startStr,
                end: updatedEvent.endStr,
            }
            : e
            )
        );
    };

    return(
        <div>
            <h2 className="fullcalendar-h2">Agenda</h2>
            <FullCalendar
                plugins={[daygridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={[...evenement, ...events]}
                editable={true}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventChange={handleEventChange}
            />
        </div>
    );
}