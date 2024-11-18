import { useRoutes } from 'react-router-dom'
import { routes } from '../../routes/index';

function AllRounter(){
  const elements = useRoutes(routes);
  return (
    <>
      {elements}
    </>
  )
}

export default AllRounter;