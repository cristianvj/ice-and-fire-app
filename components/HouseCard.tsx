import { House } from '@/interfaces'
import React, {FC} from 'react'

interface houseCardProps {
  house: House
}

const HouseCard:FC<houseCardProps> = ({house: {name, swornMembers}}) => (
  <div className="bg-purple-100 p-6 rounded-lg w-72">
    <h2 className="text-3xl font-bold mb-4 text-purple-800 text-center">{name}</h2>
      {
        swornMembers.length > 0 ? (<>
          <h3 className="text-xl font-semibold space-y-2">Sworn Members:</h3>
          <ul className="list-decimal mt-3">
            {swornMembers.map(({id, name, died}) => (
              <li key={id} className="text-base justify-between ml-7">
                <span>{name}</span>
                <span className="text-purple-950 font-bold"> - {!!died ? `Died: ${died}` : "Alive"}</span>
              </li>
            ))}
          </ul>
        </>)
        : <p className="text-center font-semibold text-purple-950 text-lg">This house has no sworn members</p>
      }
      
  </div>
)

export default HouseCard