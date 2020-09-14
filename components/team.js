import React from 'react'
import TeamMember from './teamMember'

const teamMembers = [
  {
    name: 'Joel Wasserman',
    src: 'joel.jpg',
    bio: `A software engineer at Google, Joel formerly worked
          at two education startups and is passionate about public education and technology.`
  },
  { 
    name: 'Christine Woeller',
    src: 'christine.jpeg',
    bio: `With her MBA in Finance degree from Gonzaga University, Christine seeks to improve public schools
          and ensure teachers have the best resources available.`
  },
  {
    name: 'Peter Squicciarini',
    src: 'pete.jpeg',
    bio: ` A software developer at Amazon and loving father of two, Peter strives to
          help all children and teachers succeed in an educational environment.`
  }
]

const Team = (props) =>
  (
    <section className='h-section mb0-ns pv5-l bg-card'>
      <div className='flex flex-column z-100 pt4-m'>
        <h2 className='f2-l f3 mv3-m tf-oswald center' style={{fontSize:60 }} >
        Meet the Team
        </h2>
        <ul className='list flex flex-row flex-wrap justify-center w-auto mb0 pv0 ph0 center bg'>
          {teamMembers.map(member =>
            <TeamMember
              name={member.name}
              src={member.src}
              bio={member.bio}
              key={member.bio}
            />)
          }
        </ul>
      </div>
    </section>
  )

export default Team
