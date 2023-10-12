import { useEffect, useMemo, useState } from 'react';
import styles from './chart.module.css';
import classNames from 'classnames';

interface IChart {
  title: string;
  data: {
    active: number;
    inactive: number;
    completed: number;
  };
}

export function Chart({ title, data }: IChart) {
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [hoverSector, setHoverSector] = useState('');
  const [totalHover, setTotalHover] = useState(false);

  const total = useMemo(() => {
    return data.active + data.completed + data.inactive;
  }, [data.active, data.completed, data.inactive]);

  const totalLegend = useMemo(() => {
    switch (hoverSector) {
      case 'active':
        return data.active;
      case 'completed':
        return data.completed;
      case 'inactive':
        return data.inactive;
      case '':
        return data.active + data.completed + data.inactive;
    }
  }, [data.active, data.completed, data.inactive, hoverSector]);

  useEffect(() => {
    setActive((data.active * 100) / total);
    setInactive((data.inactive * 100) / total);
    setCompleted((data.completed * 100) / total);
  }, [data.active, data.completed, data.inactive, total]);

  return (
    <div className={styles.root}>
      <div className={styles.chart}>
        {totalHover ? (
          <svg className='chart' width='300' height='300' viewBox='0 0 50 50'>
            <circle
              className={styles.sector}
              r='15.9'
              cx='50%'
              cy='50%'
              style={{
                fill: 'none',
                strokeWidth: 3,
                stroke: '#ff6347',
                strokeDasharray: `${active} 100`,
              }}
            ></circle>
            <circle
              className={styles.sector}
              r='15.9'
              cx='50%'
              cy='50%'
              style={{
                fill: 'none',
                strokeWidth: 3,
                stroke: '#9bf03a',
                strokeDasharray: `${completed} 100`,
                strokeDashoffset: `-${active}`,
              }}
            ></circle>
            <circle
              className={styles.sector}
              r='15.9'
              cx='50%'
              cy='50%'
              style={{
                fill: 'none',
                strokeWidth: 3,
                stroke: '#6e13e6',
                strokeDasharray: `${inactive} 100`,
                strokeDashoffset: `-${completed + active}`,
              }}
            ></circle>
          </svg>
        ) : (
          <svg className='chart' width='300' height='300' viewBox='0 0 50 50'>
            <circle
              className={styles.sector}
              r='15.9'
              cx='50%'
              cy='50%'
              style={{
                fill: 'none',
                strokeWidth: hoverSector === 'active' ? 3 : 2,
                stroke: hoverSector === 'active' ? '#ff6347' : '#959494f8',
                strokeDasharray: `${active} 100`,
              }}
              onMouseEnter={() => setHoverSector('active')}
              onMouseLeave={() => setHoverSector('')}
            ></circle>
            <circle
              className={styles.sector}
              r='15.9'
              cx='50%'
              cy='50%'
              style={{
                fill: 'none',
                strokeWidth: hoverSector === 'completed' ? 3 : 2,
                stroke: hoverSector === 'completed' ? '#9bf03a' : '#242424',
                strokeDasharray: `${completed} 100`,
                strokeDashoffset: `-${active}`,
              }}
              onMouseEnter={() => setHoverSector('completed')}
              onMouseLeave={() => setHoverSector('')}
            ></circle>
            <circle
              className={styles.sector}
              r='15.9'
              cx='50%'
              cy='50%'
              style={{
                fill: 'none',
                strokeWidth: hoverSector === 'inactive' ? 3 : 2,
                stroke: hoverSector === 'inactive' ? '#6e13e6' : '#b2b1b1e6',
                strokeDasharray: `${inactive} 100`,
                strokeDashoffset: `-${completed + active}`,
              }}
              onMouseEnter={() => setHoverSector('inactive')}
              onMouseLeave={() => setHoverSector('')}
            ></circle>
          </svg>
        )}
        <div className={styles.centrLegend}>
          <p className={styles.title}>{title}</p>
          <p className={styles.subTitle}>{totalLegend}</p>
        </div>
      </div>
      <p
        className={classNames(styles.legendSubTitle, totalHover && styles.activeLegendSubTitle)}
        onMouseEnter={() => setTotalHover(true)}
        onMouseLeave={() => setTotalHover(false)}
      >{`Всего: ${total}`}</p>
      <p
        className={classNames(styles.legendSubTitle, hoverSector === 'active' && styles.activeLegendSubTitle)}
        onMouseEnter={() => setHoverSector('active')}
        onMouseLeave={() => setHoverSector('')}
      >{`Активных: ${data.active}`}</p>
      <p
        className={classNames(
          styles.legendSubTitle,
          hoverSector === 'inactive' && styles.activeLegendSubTitle
        )}
        onMouseEnter={() => setHoverSector('inactive')}
        onMouseLeave={() => setHoverSector('')}
      >{`Неактивных: ${data.inactive}`}</p>
      <p
        className={classNames(
          styles.legendSubTitle,
          hoverSector === 'completed' && styles.activeLegendSubTitle
        )}
        onMouseEnter={() => setHoverSector('completed')}
        onMouseLeave={() => setHoverSector('')}
      >{`Завершённых: ${data.completed}`}</p>
    </div>
  );
}
