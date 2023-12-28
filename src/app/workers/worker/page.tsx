'use client'
import axios from "axios";
import React from "react";
import './addWorker.css'


const addWorker = () => {
 
   return <div className="addWorker">
   <form onSubmit={e=>e.preventDefault()}>
    <h2>Новый работник</h2>
    <label>
        ФИО Сотрудника
    </label>
    <br/>
    <input type="text"/>
    <br/>
    <label>
        Отдел
    </label>
    <br/>
    <input type="text"/>
    <br/>
   <label>
        Телефон
    </label>
    <br/>
    <input type="text"/>
    <br/>
    <label>
        Номер карты
    </label>
    <br/>
    <input type="text"/>
    <br/>
    <label>
        Фото сотрудника
    </label>
    <br/>
    <input type="file"/>
    <button className="addRab">Добавить</button>
    </form>
    </div>
   
};

export default addWorker;
