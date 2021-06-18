import React from 'react'
import Resultitem from './Resultitem';

function ResultDrawer({result,handleallresults}) {
    return (
        <div className="z-10 absolute top-10 right-auto w-72 ml-2 h-auto max-h-96 overflow-scroll overflow-x-hidden searchdraw bg-white p-2 border border-gray-400 rounded-lg" onClick={handleallresults}>
            
            {
                result.map(obj=>{
                    return (
                            <Resultitem
                                name={obj.name}
                                image={obj.images[0]}
                                fbid={obj.objectID}
                            />
                    )
                })
            }
        </div>
    )
}

export default ResultDrawer





