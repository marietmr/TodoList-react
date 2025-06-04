import React, {useState, useEffect, useRef, useCallback} from "react";
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid" //vue par mois
import timeGridPlugin from "@fullcalendar/timegrid" // vue par semain/joour
import interactionPlugin from "@fullcalendar/interaction" //drag and drop

// import '@fullcalendar/core/index.global.css';
// import '@fullcalendar/daygrid/index.global.css';
// import '@fullcalendar/timegrid/index.global.css';


import "../App.css"

export default function CalendarComponent( { todos }){
    const events = todos
        .filter(todo => todo.date)
        .map((todo) => ({
        id: todo.id.toString(),
        title: todo.text,
        start: todo.date,
        end: new Date(new Date(todo.date).getTime() + 30 * 60 * 1000),
        allDay: false, 
    }));

    return(
        <div>
            <h2 className="fullcalendar-h2">Agenda</h2>
            <FullCalendar
                plugins={[daygridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                editable={false}
                selectable={false}
            />
        </div>
    );
}