import React from 'react'
import { FaCircle } from "react-icons/fa";

/**
 * 
 * @param {*} trackData the tracking data
 * @param {*} trailingDots set to true if the last node should also have dots for spacing
 * @returns 
 */
const TrackCheckpoints = ({trackData, trailingDots = false}) => {
    const dots = new Array(5).fill(0);

    return (
        <>
            {trackData && trackData.map((data, index) => (
                <div className='grid grid-cols-[80px_50px_auto] grid-rows-[auto_auto] items-center text-dark-brown' key={index}>
                    {/** Checkpoint Date and time */}
                    <div className='ml-auto'>
                        <p className='font-header text-right'>{data.checkpoint_date[0]}</p>
                        <p className='text-right'>{data.checkpoint_date[1]}</p>
                    </div>

                    {/** Icon */}
                    <div className="flex justify-center items-center">
                        <FaCircle />
                    </div>

                    {/** Checkpoint Info */}
                    <div className='bg-light-brown p-4 rounded-xl bg-opacity-30'>
                        <p className='text-left font-header'>{data.location} | {data.checkpoint_delivery_status}</p>
                        <p>{data.tracking_detail}</p>
                    </div>

                    {/** Dots */}
                    {(index === trackData.length - 1 ? trailingDots : true) && (
                        <div className="flex flex-col justify-center items-center row-start-2 col-start-2 h-fit gap-4 opacity-40">
                            {dots.map((_, index) => (
                                <FaCircle key={index} size={8}/>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

export default TrackCheckpoints
