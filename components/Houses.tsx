'use client'

import React, { useState, useEffect } from 'react'
import { getCharacter, getHouses } from '@/utils/api'
import HouseCard from './HouseCard';
import { House } from '@/interfaces';
import Pagination from './Pagination';

const Houses = () => {

  const [houses, setHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getHousesData = async () => {
      try {
        const housesData = await getHouses(page);
        const housesWithMembers = await Promise.all(
          housesData.map(async (house: any, id: number) => {
            const swornMembers = await Promise.all(
              house.swornMembers.map(async (memberUrl: string, id: number) => {
                const member = await getCharacter(memberUrl);
                return {id, name: member.name, died: member.died};
              })
            );
            return { id, name: house.name, swornMembers };
          })
        );
  
        setHouses(housesWithMembers);
        setIsLoading(false);
        setIsLastPage(housesData.length < 10);
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError(true);
      }
    }
    
    getHousesData();
  }, [page])

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setIsLoading(true);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setPage(page + 1);
      setIsLoading(true);
    }
  };

  if (error) {
    return <p className='text-2xl text-center m-16'>Error fetching data...</p>
  }

  if(isLoading) {
    return (<div className='w-full flex justify-center my-32'>
      <p className='text-2xl'>Loading...</p>
    </div>)
  }


  return (
    <>
      <Pagination handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} page={page} isLastPage={isLastPage}/>
      <section className='w-full my-10 px-12 py-10 flex gap-5 flex-wrap justify-around'>
        {
          houses.map((house) => <div key={house.id}> <HouseCard house={house}/> </div> )
        }
      </section>
    </>
  )
}

export default Houses