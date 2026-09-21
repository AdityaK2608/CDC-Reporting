import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileBarChart2,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  X,
  Zap,
} from 'lucide-react';

type Section =
  | 'Dashboard'
  | 'Roster'
  | 'Tickets'
  | 'Reports'
  | 'Customers'
  | 'Handover'
  | 'Knowledge'
  | 'Templates';

type Member = {
  id: string;
  name: string;
  role: string;
  shift: string;
  status: string;
  initials: string;
  color: string;
};
type TicketItem = {
  id: string;
  title: string;
  customer: string;
  priority: string;
  owner: string;
  status: string;
  age: string;
};
type Report = {
  id: string;
  customer: string;
  cadence: string;
  due: string;
  owner: string;
  status: string;
};
type Customer = {
  id: string;
  name: string;
  short: string;
  cadence: string;
  owner: string;
  health: string;
};
type Handover = {
  id: string;
  title: string;
  detail: string;
  owner: string;
  priority: string;
};

const seedMembers: Member[] = [
  {
    id: '1',
    name: 'Aditya Kumar',
    role: 'Reporting Lead',
    shift: 'General · 09:00–18:00',
    status: 'On shift',
    initials: 'AK',
    color: 'violet',
  },
  {
    id: '2',
    name: 'Rahul Singh',
    role: 'SOC Analyst',
    shift: 'Morning · 06:00–15:00',
    status: 'On shift',
    initials: 'RS',
    color: 'blue',
  },
  {
    id: '3',
    name: 'Sachin Kumar',
    role: 'SOC Analyst',
    shift: 'Evening · 14:00–23:00',
    status: 'Upcoming',
    initials: 'SK',
    color: 'emerald',
  },
  {
    id: '4',
    name: 'Amit Sharma',
    role: 'SOC Analyst',
    shift: 'Night · 22:00–07:00',
    status: 'Off shift',
    initials: 'AS',
    color: 'amber',
  },
  {
    id: '5',
    name: 'Priya Verma',
    role: 'Reporting Analyst',
    shift: 'General · 09:00–18:00',
    status: 'On leave',
    initials: 'PV',
    color: 'rose',
  },
];

const seedTickets: TicketItem[] = [
  {
    id: 'INC-10482',
    title: 'Monthly SIEM report discrepancy',
    customer: 'Fusion Microfinance',
    priority: 'P2',
    owner: 'Aditya',
    status: 'In Progress',
    age: '1h 42m',
  },
  {
    id: 'REQ-10476',
    title: 'Retention scope clarification',
    customer: 'KPMG',
    priority: 'P3',
    owner: 'Rahul',
    status: 'Pending Customer',
    age: '4h 12m',
  },
  {
    id: 'INC-10471',
    title: 'EDR report data validation',
    customer: 'Genus APDCL',
    priority: 'P3',
    owner: 'Sachin',
    status: 'Open',
    age: '6h 08m',
  },
  {
    id: 'REQ-10465',
    title: 'Quarterly report approval',
    customer: 'NABFID',
    priority: 'P3',
    owner: 'Priya',
    status: 'Resolved',
    age: '1d 03h',
  },
];

const seedReports: Report[] = [
  {
    id: 'R-001',
    customer: 'Fusion Microfinance',
    cadence: 'Monthly',
    due: 'Today · 16:00',
    owner: 'Aditya',
    status: 'In progress',
  },
  {
    id: 'R-002',
    customer: 'KPMG',
    cadence: 'Monthly',
    due: 'Today · 18:00',
    owner: 'Rahul',
    status: 'Pending review',
  },
  {
    id: 'R-003',
    customer: 'Genus APDCL',
    cadence: 'Weekly',
    due: 'Tomorrow · 12:00',
    owner: 'Sachin',
    status: 'Not started',
  },
  {
    id: 'R-004',
    customer: 'NABFID',
    cadence: 'Quarterly',
    due: '23 Sep · 17:00',
    owner: 'Priya',
    status: 'Scheduled',
  },
  {
    id: 'R-005',
    customer: 'Intellect CA',
    cadence: 'Bi-weekly',
    due: '24 Sep · 15:00',
    owner: 'Aditya',
    status: 'Scheduled',
  },
];

const seedCustomers: Customer[] = [
  {
    id: 'C-01',
    name: 'Fusion Microfinance',
    short: 'FM',
    cadence: 'Monthly',
    owner: 'Aditya',
    health: 'Healthy',
  },
  {
    id: 'C-02',
    name: 'KPMG',
    short: 'KP',
    cadence: 'Monthly',
    owner: 'Rahul',
    health: 'Healthy',
  },
  {
    id: 'C-03',
    name: 'Genus APDCL',
    short: 'GA',
    cadence: 'Weekly',
    owner: 'Sachin',
    health: 'Attention',
  },
  {
    id: 'C-04',
    name: 'NABFID',
    short: 'NB',
    cadence: 'Quarterly',
    owner: 'Priya',
    health: 'Healthy',
  },
  {
    id: 'C-05',
    name: 'Intellect CA',
    short: 'IC',
    cadence: 'Bi-weekly',
    owner: 'Aditya',
    health: 'Healthy',
  },
];

const seedHandover: Handover[] = [
  {
    id: 'H-1',
    title: 'Fusion Microfinance report',
    detail: 'Validate final SIEM counts before customer share.',
    owner: 'Aditya',
    priority: 'High',
  },
  {
    id: 'H-2',
    title: 'Retention request',
    detail: 'Customer is waiting for Engineering team confirmation.',
    owner: 'Rahul',
    priority: 'Medium',
  },
  {
    id: 'H-3',
    title: 'Genus APDCL weekly report',
    detail: 'EDR section needs final validation.',
    owner: 'Sachin',
    priority: 'Medium',
  },
];

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Roster', icon: Users },
  { label: 'Tickets', icon: Ticket },
  { label: 'Reports', icon: FileBarChart2 },
  { label: 'Customers', icon: ShieldCheck },
  { label: 'Handover', icon: ArrowUpRight },
  { label: 'Knowledge', icon: BookOpen },
  { label: 'Templates', icon: FileText },
] as const;

function App() {
  const [section, setSection] = useState<Section>('Dashboard');
  const [members, setMembers] = useState<Member[]>(seedMembers);
  const [tickets, setTickets] = useState<TicketItem[]>(seedTickets);
  const [reports, setReports] = useState<Report[]>(seedReports);
  const [customers] = useState<Customer[]>(seedCustomers);
  const [handover] = useState<Handover[]>(seedHandover);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem('cdc-members');
      if (savedMembers) setMembers(JSON.parse(savedMembers));
    } catch {}
  }, []);

  const filteredTickets = useMemo(
    () =>
      tickets.filter(t =>
        (t.id + t.title + t.customer + t.owner)
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [tickets, search]
  );

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const addMember = async (name: string) => {
    const initials = name
      .split(' ')
      .map(x => x[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
    const newMember: Member = {
      id: crypto.randomUUID(),
      name,
      role: 'SOC Analyst',
      shift: 'General · 09:00–18:00',
      status: 'On shift',
      initials,
      color: 'violet',
    };
    setMembers(prev => [...prev, newMember]);
    setShowAdd(false);
    notify('Team member added to the roster');
    try {
      localStorage.setItem('cdc-members', JSON.stringify([...members, newMember]));
    } catch {}
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Activity size={19} />
          </div>
          <div>
            <strong>CDC</strong>
            <span>Reporting Hub</span>
          </div>
        </div>
        <div className="workspace-pill">
          <span className="live-dot" /> CDC-Reporting <ChevronDown size={14} />
        </div>
        <div className="nav-label">Workspace</div>
        <nav>
          {nav.map(item => {
            const Icon = item.icon;
            const active = section === item.label;
            return (
              <button
                key={item.label}
                className={active ? 'nav-item active' : 'nav-item'}
                onClick={() => setSection(item.label as Section)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.label === 'Tickets' && (
                  <em>{tickets.filter(t => t.status !== 'Resolved').length}</em>
                )}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-card">
            <div className="mini-icon">
              <Sparkles size={16} />
            </div>
            <div>
              <b>Team pulse</b>
              <span>All systems normal</span>
            </div>
          </div>
          <button className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <div className="user-chip">
            <div className="avatar violet">AK</div>
            <div>
              <b>Aditya Kumar</b>
              <span>Reporting Lead</span>
            </div>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>CDC-Reporting</span>
            <span>/</span>
            <b>{section}</b>
          </div>
          <div className="top-actions">
            <div className="search">
              <Search size={17} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search workspace..."
              />
              <kbd>⌘ K</kbd>
            </div>
            <button
              className="icon-btn"
              onClick={() => notify('You are all caught up')}
            >
              <Bell size={18} />
              <i />
            </button>
            <div className="avatar violet">AK</div>
          </div>
        </header>

        <div className="content">
          {section === 'Dashboard' && (
            <Dashboard
              members={members}
              tickets={tickets}
              reports={reports}
              customers={customers}
              onNavigate={setSection}
            />
          )}
          {section === 'Roster' && (
            <Roster
              members={members}
              onAdd={() => setShowAdd(true)}
              onNotify={notify}
            />
          )}
          {section === 'Tickets' && (
            <Tickets tickets={filteredTickets} onNotify={notify} />
          )}
          {section === 'Reports' && (
            <Reports reports={reports} onNotify={notify} />
          )}
          {section === 'Customers' && <Customers customers={customers} />}
          {section === 'Handover' && <Handover items={handover} />}
          {section === 'Knowledge' && <Knowledge />}
          {section === 'Templates' && <Templates onNotify={notify} />}
        </div>
      </main>

      {showAdd && (
        <AddMember onClose={() => setShowAdd(false)} onAdd={addMember} />
      )}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function PageHead({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      {action}
    </div>
  );
}

function Dashboard({
  members,
  tickets,
  reports,
  customers,
  onNavigate,
}: {
  members: Member[];
  tickets: TicketItem[];
  reports: Report[];
  customers: Customer[];
  onNavigate: (s: Section) => void;
}) {
  const open = tickets.filter(t => t.status !== 'Resolved').length;
  const due = reports.filter(r => r.status !== 'Scheduled').length;
  return (
    <div>
      <PageHead
        eyebrow="MONDAY · 21 SEP 2026"
        title="Good evening, Aditya."
        sub="Here’s what needs your attention across CDC-Reporting today."
        action={
          <button className="primary" onClick={() => onNavigate('Roster')}>
            <Plus size={17} /> Manage roster
          </button>
        }
      />
      <div className="stat-grid">
        <Stat
          label="Open tickets"
          value={String(open)}
          delta="+2 today"
          icon={Ticket}
          tone="blue"
        />
        <Stat
          label="Reports due"
          value={String(due)}
          delta="2 due today"
          icon={FileBarChart2}
          tone="violet"
        />
        <Stat
          label="SLA at risk"
          value="2"
          delta="Needs attention"
          icon={AlertCircle}
          tone="amber"
        />
        <Stat
          label="Team coverage"
          value="92%"
          delta="4 / 5 active"
          icon={Users}
          tone="green"
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel wide">
          <div className="panel-head">
            <div>
              <h3>Today’s workload</h3>
              <span>Live overview of operational queues</span>
            </div>
            <button className="ghost" onClick={() => onNavigate('Tickets')}>
              View tickets <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="workload">
            <WorkItem
              icon={Ticket}
              title="Ticket queue"
              value={open + ' active'}
              meta="2 need attention"
              onClick={() => onNavigate('Tickets')}
            />
            <WorkItem
              icon={FileBarChart2}
              title="Reports"
              value="2 due today"
              meta="1 in progress"
              onClick={() => onNavigate('Reports')}
            />
            <WorkItem
              icon={CalendarDays}
              title="Roster"
              value="4 on shift"
              meta="1 on leave"
              onClick={() => onNavigate('Roster')}
            />
            <WorkItem
              icon={ArrowUpRight}
              title="Handover"
              value="3 items"
              meta="1 high priority"
              onClick={() => onNavigate('Handover')}
            />
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Team on shift</h3>
              <span>Today · 21 Sep</span>
            </div>
            <button className="icon-link" onClick={() => onNavigate('Roster')}>
              <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="member-list">
            {members.slice(0, 4).map(m => (
              <div className="member-row" key={m.id}>
                <div className={'avatar ' + m.color}>{m.initials}</div>
                <div>
                  <b>{m.name}</b>
                  <span>{m.shift}</span>
                </div>
                <span
                  className={
                    'status ' + m.status.toLowerCase().replace(' ', '-')
                  }
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="panel wide">
          <div className="panel-head">
            <div>
              <h3>Upcoming reports</h3>
              <span>Reporting calendar · next 5 deliverables</span>
            </div>
            <button className="ghost" onClick={() => onNavigate('Reports')}>
              Open calendar <CalendarDays size={15} />
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Cadence</th>
                  <th>Due</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 4).map(r => (
                  <tr key={r.id}>
                    <td>
                      <b>{r.customer}</b>
                    </td>
                    <td>{r.cadence}</td>
                    <td>{r.due}</td>
                    <td>{r.owner}</td>
                    <td>
                      <span className="tag">{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Customer health</h3>
              <span>{customers.length} active customers</span>
            </div>
            <button
              className="icon-link"
              onClick={() => onNavigate('Customers')}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="health-list">
            {customers.slice(0, 4).map(c => (
              <div className="health-row" key={c.id}>
                <div className="customer-logo">{c.short}</div>
                <div>
                  <b>{c.name}</b>
                  <span>
                    {c.cadence} · {c.owner}
                  </span>
                </div>
                <span
                  className={
                    c.health === 'Healthy' ? 'health good' : 'health warn'
                  }
                >
                  {c.health}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  icon: any;
  tone: string;
}) {
  return (
    <div className="stat">
      <div className={'stat-icon ' + tone}>
        <Icon size={18} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{delta}</small>
      </div>
    </div>
  );
}
function WorkItem({
  icon: Icon,
  title,
  value,
  meta,
  onClick,
}: {
  icon: any;
  title: string;
  value: string;
  meta: string;
  onClick: () => void;
}) {
  return (
    <button className="work-item" onClick={onClick}>
      <div className="work-icon">
        <Icon size={18} />
      </div>
      <div>
        <span>{title}</span>
        <b>{value}</b>
        <small>{meta}</small>
      </div>
      <ArrowUpRight size={15} />
    </button>
  );
}

function Roster({
  members,
  onAdd,
  onNotify,
}: {
  members: Member[];
  onAdd: () => void;
  onNotify: (s: string) => void;
}) {
  return (
    <div>
      <PageHead
        eyebrow="PEOPLE & COVERAGE"
        title="Roster management"
        sub="Plan shifts, coverage and handovers without spreadsheet juggling."
        action={
          <button className="primary" onClick={onAdd}>
            <Plus size={17} /> Add member
          </button>
        }
      />
      <div className="roster-toolbar">
        <div className="week-switch">
          <button>‹</button>
          <b>21–27 September 2026</b>
          <button>›</button>
        </div>
        <button className="secondary">
          <CalendarDays size={16} /> This week
        </button>
        <button
          className="secondary"
          onClick={() => onNotify('Roster export prepared')}
        >
          <ArrowUpRight size={16} /> Export
        </button>
      </div>
      <div className="roster-grid">
        <div className="shift-column">
          <div className="shift-head">TEAM</div>
          {members.map(m => (
            <div className="person-cell" key={m.id}>
              <div className={'avatar ' + m.color}>{m.initials}</div>
              <div>
                <b>{m.name}</b>
                <span>{m.role}</span>
              </div>
            </div>
          ))}
        </div>
        {['MON 21', 'TUE 22', 'WED 23', 'THU 24', 'FRI 25'].map((day, i) => (
          <div className="day-column" key={day}>
            <div className="shift-head">{day}</div>
            {members.map((m, j) => (
              <button
                key={m.id}
                className={'shift-cell ' + (j === 4 ? 'leave' : '')}
                onClick={() =>
                  onNotify(
                    j === 4 ? 'Priya is on leave' : 'Shift assignment updated'
                  )
                }
              >
                <b>
                  {j === 4
                    ? 'LEAVE'
                    : i % 2 === 0
                      ? j % 3 === 0
                        ? 'GENERAL'
                        : j % 3 === 1
                          ? 'MORNING'
                          : 'EVENING'
                      : j % 2 === 0
                        ? 'GENERAL'
                        : 'NIGHT'}
                </b>
                <span>
                  {j === 4
                    ? '—'
                    : j % 3 === 0
                      ? '09:00–18:00'
                      : j % 3 === 1
                        ? '06:00–15:00'
                        : '14:00–23:00'}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="coverage-note">
        <CheckCircle2 size={18} />
        <div>
          <b>Coverage looks healthy this week</b>
          <span>
            No uncovered shift blocks detected. Priya’s leave is covered by the
            general shift.
          </span>
        </div>
      </div>
    </div>
  );
}

function Tickets({
  tickets,
  onNotify,
}: {
  tickets: TicketItem[];
  onNotify: (s: string) => void;
}) {
  return (
    <div>
      <PageHead
        eyebrow="SERVICE OPERATIONS"
        title="Ticket queue"
        sub="Track ownership, SLA exposure and customer-facing work."
        action={
          <button
            className="primary"
            onClick={() => onNotify('New ticket workflow opened')}
          >
            <Plus size={17} /> New ticket
          </button>
        }
      />
      <div className="filter-row">
        <div className="filter active">
          All <b>{tickets.length}</b>
        </div>
        <div className="filter">
          Open <b>{tickets.filter(t => t.status === 'Open').length}</b>
        </div>
        <div className="filter">
          In Progress{' '}
          <b>{tickets.filter(t => t.status === 'In Progress').length}</b>
        </div>
        <div className="filter">Pending Customer</div>
        <div className="filter">Resolved</div>
      </div>
      <section className="panel">
        <div className="table-wrap">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Customer</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Age</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id}>
                  <td>
                    <b className="ticket-id">{t.id}</b>
                    <span className="subcell">{t.title}</span>
                  </td>
                  <td>{t.customer}</td>
                  <td>
                    <span className={'priority ' + t.priority.toLowerCase()}>
                      {t.priority}
                    </span>
                  </td>
                  <td>{t.owner}</td>
                  <td>{t.age}</td>
                  <td>
                    <span className="status-pill">{t.status}</span>
                  </td>
                  <td>
                    <button
                      className="dots"
                      onClick={() => onNotify(t.id + ' opened')}
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Reports({
  reports,
  onNotify,
}: {
  reports: Report[];
  onNotify: (s: string) => void;
}) {
  return (
    <div>
      <PageHead
        eyebrow="REPORTING CONTROL CENTER"
        title="Reports calendar"
        sub="Every recurring deliverable in one place, with owners and deadlines."
        action={
          <button
            className="primary"
            onClick={() => onNotify('Report creation workflow opened')}
          >
            <Plus size={17} /> Add report
          </button>
        }
      />
      <div className="report-banner">
        <div className="banner-icon">
          <Zap size={19} />
        </div>
        <div>
          <b>2 reports need attention today</b>
          <span>Fusion Microfinance and KPMG are due before end of day.</span>
        </div>
        <button onClick={() => onNotify('Showing reports due today')}>
          Review now <ArrowUpRight size={15} />
        </button>
      </div>
      <section className="panel">
        <div className="calendar-head">
          <button>‹</button>
          <h3>September 2026</h3>
          <button>›</button>
          <div className="calendar-actions">
            <button className="secondary">Month</button>
            <button className="secondary">List</button>
          </div>
        </div>
        <div className="calendar-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div className="cal-day-name" key={d}>
              {d}
            </div>
          ))}
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const report = reports.find(r => r.due.includes(String(day)));
            return (
              <div
                className={'cal-cell ' + (day === 21 ? 'today' : '')}
                key={day}
              >
                <span>{day}</span>
                {report && (
                  <button
                    onClick={() =>
                      onNotify(report.customer + ' report selected')
                    }
                    className={
                      'cal-event ' +
                      (report.status === 'In progress' ? 'violet' : 'blue')
                    }
                  >
                    {report.customer.split(' ')[0]} · {report.cadence}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Customers({ customers }: { customers: Customer[] }) {
  return (
    <div>
      <PageHead
        eyebrow="CUSTOMER DIRECTORY"
        title="Customers"
        sub="Reporting cadence, ownership and operational health."
        action={
          <button className="primary">
            <Plus size={17} /> Add customer
          </button>
        }
      />
      <div className="customer-grid">
        {customers.map(c => (
          <div className="customer-card" key={c.id}>
            <div className="customer-card-top">
              <div className="customer-logo large">{c.short}</div>
              <span
                className={
                  c.health === 'Healthy' ? 'health good' : 'health warn'
                }
              >
                {c.health}
              </span>
            </div>
            <h3>{c.name}</h3>
            <p>{c.cadence} reporting</p>
            <div className="customer-meta">
              <span>
                Owner <b>{c.owner}</b>
              </span>
              <span>
                Reports <b>{c.cadence === 'Weekly' ? '4' : '1'}/cycle</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Handover({ items }: { items: Handover[] }) {
  return (
    <div>
      <PageHead
        eyebrow="SHIFT CONTINUITY"
        title="Handover board"
        sub="Keep the next shift aligned on open work and important context."
        action={
          <button className="primary">
            <Plus size={17} /> Add note
          </button>
        }
      />
      <div className="handover-columns">
        <div className="handover-col">
          <div className="column-title">
            <Clock3 size={17} /> Current shift <span>3</span>
          </div>
          {items.map(x => (
            <div className="handover-card" key={x.id}>
              <div className="hc-top">
                <span
                  className={
                    x.priority === 'High' ? 'priority p2' : 'priority p3'
                  }
                >
                  {x.priority}
                </span>
                <MoreHorizontal size={16} />
              </div>
              <h3>{x.title}</h3>
              <p>{x.detail}</p>
              <div className="hc-foot">
                <div className="avatar violet">AK</div>
                <span>{x.owner}</span>
                <small>Updated 12m ago</small>
              </div>
            </div>
          ))}
        </div>
        <div className="handover-col">
          <div className="column-title">
            <CheckCircle2 size={17} /> Ready for next shift <span>0</span>
          </div>
          <div className="empty-state">
            <CheckCircle2 size={28} />
            <b>Nothing waiting</b>
            <span>Great work. New handover items will appear here.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Knowledge() {
  const cards = [
    ['SIEM operations', 'QRadar, Splunk, Sentinel & Wazuh', '12 articles'],
    ['Reporting SOPs', 'Weekly, monthly & quarterly workflows', '18 articles'],
    ['Ticketing', 'SLA, 3-strike & closure process', '9 articles'],
    ['Troubleshooting', 'Ingestion, parsing & retention issues', '14 articles'],
  ];
  return (
    <div>
      <PageHead
        eyebrow="TEAM KNOWLEDGE"
        title="Knowledge base"
        sub="The team’s single source of truth for processes and troubleshooting."
        action={
          <button className="primary">
            <Plus size={17} /> New article
          </button>
        }
      />
      <div className="kb-search">
        <Search size={18} />
        <input placeholder="Search SOPs, troubleshooting guides, processes..." />
      </div>
      <div className="kb-grid">
        {cards.map(([title, desc, count], i) => (
          <div className="kb-card" key={title}>
            <div className={'kb-icon k' + i}>
              <BookOpen size={19} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span>
              {count} <ArrowUpRight size={14} />
            </span>
          </div>
        ))}
      </div>
      <section className="panel recent-panel">
        <div className="panel-head">
          <div>
            <h3>Recently updated</h3>
            <span>Latest team documentation</span>
          </div>
        </div>
        {[
          'Ticket Closure Process V1',
          'SIEM Report Validation Checklist',
          'Pending Customer — 3 Strike Policy',
        ].map((x, i) => (
          <div className="article-row" key={x}>
            <div className="doc-icon">
              <FileText size={17} />
            </div>
            <div>
              <b>{x}</b>
              <span>
                Updated {i + 1} day{i ? 's' : ''} ago · CDC-Reporting
              </span>
            </div>
            <ArrowUpRight size={15} />
          </div>
        ))}
      </section>
    </div>
  );
}

function Templates({ onNotify }: { onNotify: (s: string) => void }) {
  const templates = [
    'Customer report shared',
    'Pending on customer',
    '3-strike closure',
    'Engineering team escalation',
    'Additional information request',
    'Report approval follow-up',
  ];
  return (
    <div>
      <PageHead
        eyebrow="COMMUNICATION LIBRARY"
        title="Templates"
        sub="Reusable customer and internal responses, ready when you need them."
        action={
          <button className="primary">
            <Plus size={17} /> New template
          </button>
        }
      />
      <div className="template-grid">
        {templates.map((t, i) => (
          <div className="template-card" key={t}>
            <div className="template-top">
              <div className="doc-icon">
                <FileText size={17} />
              </div>
              <button className="dots" onClick={() => onNotify(t + ' copied')}>
                <MoreHorizontal size={17} />
              </button>
            </div>
            <h3>{t}</h3>
            <p>
              {i % 2 === 0
                ? 'Customer-facing response'
                : 'Internal team communication'}{' '}
              · Last edited recently
            </p>
            <button
              className="secondary full"
              onClick={() => onNotify(t + ' copied to clipboard')}
            >
              <FileText size={15} /> Use template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddMember({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (name: string) => void;
}) {
  const [name, setName] = useState('');
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head">
          <div>
            <span className="eyebrow">ROSTER</span>
            <h2>Add team member</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <label>
          Full name
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Neha Singh"
          />
        </label>
        <label>
          Default shift
          <select>
            <option>General · 09:00–18:00</option>
            <option>Morning · 06:00–15:00</option>
            <option>Evening · 14:00–23:00</option>
            <option>Night · 22:00–07:00</option>
          </select>
        </label>
        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="primary"
            disabled={!name.trim()}
            onClick={() => onAdd(name.trim())}
          >
            Add member
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
