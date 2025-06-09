import React from 'react';
import Chart from 'react-apexcharts';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import './CalendarCustom.css';

function Dashboard() {
       const chartOptions = {
              chart: {      type: 'area',
                            fontFamily: 'Inter, sans-serif',
                            toolbar: { show: false },
                            dropShadow: { enabled: false },   },
              tooltip: {    enabled: true,
                            x: { show: false },               },
              fill: {       type: 'gradient',
                            gradient: {
                                   opacityFrom: 0.55,
                                   opacityTo: 0,
                                   shade: '#1C64F2',
                                   gradientToColors: ['#1C64F2'],},},
              dataLabels: { enabled: false },
              stroke: {     width: 6 },
              grid: {       show: false,
                            strokeDashArray: 4,
                            padding: { left: 2, right: 2, top: 0 },},
              xaxis: {      categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
                            labels: { show: false },
                            axisBorder: { show: false },
                            axisTicks: { show: false },},
              yaxis: {      show: false },
       };

       const series = [ {
              name: 'New users',
              data: [6500, 6418, 6456, 6526, 6356, 6456],
              color: '#1A56DB',
       },];

       const widgets = [
              {
                     title: 'Day Tour Bookings',
                     value: 106,
                     icon: 'fa-solid fa-dollar-sign',
                     percentage: 60,
                     trend: 'up',
                     color: '#1C64F2', // Warna biru kayak gambar
              },
              {
                     title: 'Car Rental Bookings',
                     value: 106,
                     icon: 'fa-solid fa-car',
                     percentage: 60,
                     trend: 'up',
                     color: '#1C64F2',
              },
              {
                     title: 'Cancelled Day Tour Bookings',
                     value: 16,
                     icon: 'fa-solid fa-dollar-sign',
                     percentage: -60,
                     trend: 'down',
                     color: '#EF4444', // Warna merah kayak gambar
              },
              {
                     title: 'Cancelled Car Rental Bookings',
                     value: 106,
                     icon: 'fa-solid fa-car',
                     percentage: 60,
                     trend: 'up',
                     color: '#1C64F2',
              },
       ];

       return (
              <div className="p-2">
                     <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                            {/* WIDGET */}
                            <div className="lg:col-span-3 grid grid-cols-2 gap-5">
                                   {widgets.map((widget, index) => (
                                   <div key={index} className="w-full bg-white rounded-lg shadow-sm p-4">
                                          <div className="flex justify-between">
                                                 <div>
                                                        <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">{widget.value}</h5>
                                                        <i className={`${widget.icon} w-5 h-5 text-gray-500 hover:text-gray-900`}></i>
                                                        <span className="text-base font-normal text-gray-900">{widget.title}</span>
                                                 </div>
                                                 <div className={`flex items-center px-2.5 py-0.5 text-base font-semibold ${widget.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {widget.percentage > 0 ? `+${widget.percentage}%` : `${widget.percentage}%`}
                                                        <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                                               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={widget.trend === 'up' ? 'M5 13V1m0 0L1 5m4-4 4 4' : 'M5 1v12m0 0L9 7m-4 4-4-4'}/>
                                                        </svg>
                                                 </div>
                                          </div>

                                          <Chart
                                                 options={{ ...chartOptions, fill: { ...chartOptions.fill, gradient: { ...chartOptions.fill.gradient, shade: widget.color } } }}
                                                 series={series}
                                                 type="area"
                                                 height={100}
                                          />

                                          <div className="grid grid-cols-1 items-center justify-between mt-2">
                                                 <p className="text-sm font-medium text-gray-500 text-center">From last month</p>
                                          </div>
                                   </div>
                                   ))}
                            </div>


                            {/* KALENDERRR */}
                            <div className="lg:col-span-1">
                                   <div className="w-full p-1 rounded-lg">
                                          <h5 className="text-2xl font-bold text-gray-900 mb-5">Calendar upcoming event</h5>
                                          <Calendar
                                                 value={new Date()}
                                                 className="react-calendar"
                                                 tileClassName={({ date, view }) => {
                                                        if (view === 'month' && date.getDate()) {
                                                        return 'highlight';
                                                        }
                                                        return null;
                                                 }}
                                          />
                                   </div>
                            </div>
                     </div>
              </div>
       );
}

export default Dashboard;