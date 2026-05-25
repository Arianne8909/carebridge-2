import styles from './PortfolioTable.module.css';

const data = [
  {
    facility: 'Graceland Home, Ibadan',
    category: 'Food',
    amount: '₦45,000',
    status: 'Active',
  },
  {
    facility: 'House of Hope, Lagos',
    category: 'Medical',
    amount: '₦22,000',
    status: 'Matched',
  },
  {
    facility: 'Bethel Rest Home, Ibadan',
    category: 'Shelter',
    amount: '₦180,000',
    status: 'Active',
  },
];

export default function PortfolioTable() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Active Portfolio</h2>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Facility</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.facility}</td>
              <td>{item.category}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}