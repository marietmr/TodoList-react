import React, {useState, useEffect, useRef, useCallback} from "react";
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid" //vue par mois
import timeGridPlugin from "@fullcalendar/timegrid" // vue par semain/joour
import interactionPlugin from "@fullcalendar/interaction" //drag and drop

// import '@fullcalendar/core/index.css'
// import '@fullcalendar/daygrid/index.css'
// import '@fullcalendar/timegrid/index.css'

export default function CalendarComponent(){
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetch("/.netlify/functions/getTodos")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map(todo => ({
                    id: todo.id,
                    calendarId: "1",
                    title: todo.title,
                    category: "time",
                    isVisible: true,
                    start: new Date(todo.date),
                    end: new Date(new Date(todo.date).getTime() + 30 * 60 * 1000)
                }));
                setSchedules(formatted);
            })
    }, []);

    const [events, setEvents] = useState([]);

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
            <h2>Full calendar</h2>
            <FullCalendar
                plugins={[daygridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                editable={true}
                selectable={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventChange={handleEventChange}
            />
        </div>
    );
}