import React from 'react';
import { useSelector } from 'react-redux';
import { getUsersData } from '../../store/reducer';
import './Table.css';

const mapState = (state) => ({
  usersData: getUsersData(state),
});

export const Table = () => {
  const { usersData } = useSelector(mapState);
  const resultOfAllUsers = Object.entries(usersData);

  const firstRow = resultOfAllUsers.reduce((accum, userResults) => {
    const results = userResults[1];
    const updatedResult = [...accum];
    results.forEach((result) => {
      const i = updatedResult.findIndex((item) => item.contestId === result.contestId);
      if (i !== -1) {
        updatedResult[i].tasks.add(result.problem.index);
      } else {
        updatedResult.push({ contestId: result.contestId, tasks: new Set(result.problem.index) });
      }
    });
    return updatedResult;
  }, []);

  const taskIds = firstRow.reduce((acc, { contestId, tasks }) => [...acc, ...Array.from(tasks)
    .map((taskId) => ({ contestId, taskId }))], []);

  const otherRow = resultOfAllUsers.map(([handle, results]) => {
    const result = taskIds.map(({ contestId, taskId }) => {
      const initialResult = {
        contestId,
        taskId,
        isSuccess: false,
        failureCount: 0,
        totalCount: 0,
        isEmpty: true,
      };
      const userResult = results.reduce((acc, item) => {
        if (item.contestId === contestId && item.problem.index === taskId) {
          const isSuccess = acc.isSuccess || item.verdict === 'OK';
          const totalCount = acc.totalCount + 1;
          const failureCount = item.verdict !== 'OK' ? acc.failureCount + 1 : acc.failureCount;
          return {
            ...acc, isSuccess, totalCount, failureCount, isEmpty: false,
          };
        }
        return acc;
      }, initialResult);

      return userResult;
    });

    return { handle, result };
  });

  return (
    <div className='table-wrapper'>
    <table className='table'>
      <tbody>
      <tr>
        {firstRow.map((item, index) => {
          const { contestId, tasks } = item;
          const cell = <td className='table__contest' key={`${contestId}_${index}`} colSpan={tasks.size}>{contestId}</td>;
          if (index === 0) {
            return (
            <>
              <td key='empty' rowSpan={2}></td>
              {cell}
            </>
            );
          }
          return cell;
        })}
      </tr>
      <tr className='table__tasks'>
        {taskIds.map(({ taskId }, index) => <td key={`${taskId}_${index}`}>{taskId}</td>)}
      </tr>
      {
        otherRow.map(({ handle, result }) => (
        <tr key={`${handle}_row`}>
          <td key={`${handle}_cell`} className='table__handle'>{handle}</td>
          {result.map(({
            taskId, isSuccess, isEmpty, totalCount, failureCount,
          }, index) => {
            if (isEmpty) return <td key={`${handle}_${taskId}_${index}`}></td>;
            if (isSuccess) return <td className='table__cell_success' key={`${handle}_${taskId}_${index}`}>{failureCount <= 1 ? '+' : `+${failureCount}`}</td>;
            return <td className='table__cell_failure' key={`${handle}_${taskId}_${index}`}>{`-${totalCount}`}</td>;
          })}
          </tr>))
        }
      </tbody>
    </table>
    </div>
  );
};
