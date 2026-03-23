import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import Toggle from '../components/Toggle'
import Badge from '../components/Badge'
import Avatar from '../components/Avatar'
import Spinner from '../components/Spinner'
import ProgressBar from '../components/ProgressBar'
import Tag from '../components/Tag'
import MessageBar from '../components/MessageBar'
import Tabs from '../components/Tabs'
import Select from '../components/Select'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3 pb-8 border-b border-[#EDEBE9] last:border-0 last:pb-0">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8A8886]">{title}</h2>
    <div className="flex flex-wrap items-start gap-4">{children}</div>
  </div>
)

export default function ComponentDemo() {
  const [tags, setTags] = useState(['Design', 'Fluent 2', 'React', 'TypeScript'])
  const [progress, setProgress] = useState(65)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Component Demo</h1>
        <p className="text-sm text-gray-400 mt-1">
          Microsoft Fluent 2 Web design system ·{' '}
          <a href="https://www.figma.com/design/mSjELbJg0DugPqSB0JwocX" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            View in Figma
          </a>
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 space-y-8">

        {/* Button */}
        <Section title="Button — variants">
          <Button variant="primary">Primary</Button>
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="transparent">Transparent</Button>
        </Section>

        <Section title="Button — sizes">
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
        </Section>

        <Section title="Button — with icon & disabled">
          <Button variant="primary" icon={<span>＋</span>}>New item</Button>
          <Button variant="default" icon={<span>✎</span>}>Edit</Button>
          <Button variant="outline" icon={<span>→</span>} iconPosition="after">Next</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="default" disabled>Disabled</Button>
        </Section>

        {/* Input */}
        <Section title="Input">
          <div className="w-64"><Input label="Name" placeholder="Enter your name" /></div>
          <div className="w-64"><Input label="Search" placeholder="Search…" contentBefore={<span>🔍</span>} /></div>
          <div className="w-64"><Input label="Email" placeholder="user@example.com" hint="We'll never share your email." /></div>
          <div className="w-64"><Input label="Password" type="password" placeholder="••••••••" error="Password must be at least 8 characters." /></div>
          <div className="w-64"><Input label="Disabled" placeholder="Can't edit this" disabled /></div>
        </Section>

        {/* Select */}
        <Section title="Select">
          <div className="w-48">
            <Select label="Role" placeholder="Choose a role…" options={[
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ]} />
          </div>
          <div className="w-48">
            <Select label="Status" options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]} error="Please select a status." />
          </div>
        </Section>

        {/* Checkbox */}
        <Section title="Checkbox">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="With hint" hint="This is additional context." />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </Section>

        {/* Toggle */}
        <Section title="Toggle">
          <Toggle label="Off by default" />
          <Toggle label="On by default" defaultChecked />
          <Toggle label="Label before" labelPosition="before" />
          <Toggle label="Disabled" disabled />
        </Section>

        {/* Badge */}
        <Section title="Badge — colors (filled)">
          <Badge color="brand">Brand</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="danger">Danger</Badge>
          <Badge color="informative">Info</Badge>
          <Badge color="subtle">Subtle</Badge>
        </Section>

        <Section title="Badge — appearances">
          <Badge appearance="filled">Filled</Badge>
          <Badge appearance="tint">Tint</Badge>
          <Badge appearance="outline">Outline</Badge>
          <Badge appearance="ghost">Ghost</Badge>
          <Badge color="success" appearance="tint" shape="circular">12</Badge>
          <Badge color="danger" shape="circular">3</Badge>
        </Section>

        {/* Avatar */}
        <Section title="Avatar">
          <Avatar name="Alice Johnson" size={24} />
          <Avatar name="Bob Smith" size={32} />
          <Avatar name="Carol White" size={40} />
          <Avatar name="David Brown" size={48} />
          <Avatar name="Emma Davis" size={56} />
          <Avatar name="Frank Miller" size={40} shape="square" />
          <Avatar size={40} />
        </Section>

        {/* Tag */}
        <Section title="Tag">
          {tags.map(tag => (
            <Tag key={tag} onDismiss={() => setTags(t => t.filter(x => x !== tag))}>{tag}</Tag>
          ))}
          <Tag appearance="outline">Outline</Tag>
          <Tag appearance="brand">Brand</Tag>
          <Tag size="small">Small</Tag>
          <Tag size="large">Large</Tag>
          <Tag disabled>Disabled</Tag>
        </Section>

        {/* Spinner */}
        <Section title="Spinner">
          <Spinner size="tiny" />
          <Spinner size="extra-small" />
          <Spinner size="small" />
          <Spinner size="medium" />
          <Spinner size="large" />
          <Spinner size="extra-large" />
          <Spinner size="medium" label="Loading…" />
          <Spinner size="medium" label="Please wait" labelPosition="below" />
        </Section>

        {/* ProgressBar */}
        <Section title="Progress bar">
          <div className="w-full space-y-4">
            <ProgressBar value={progress} label="Upload progress" hint={`${progress}%`} />
            <div className="flex gap-2">
              <Button size="small" variant="outline" onClick={() => setProgress(p => Math.max(0, p - 10))}>−10</Button>
              <Button size="small" variant="outline" onClick={() => setProgress(p => Math.min(100, p + 10))}>+10</Button>
            </div>
            <ProgressBar value={30} color="success" label="Success" thickness="large" />
            <ProgressBar value={75} color="warning" label="Warning" />
            <ProgressBar value={50} color="error" label="Error" />
            <ProgressBar label="Indeterminate" />
          </div>
        </Section>

        {/* MessageBar */}
        <Section title="Message bar">
          <div className="w-full space-y-2">
            <MessageBar intent="info" title="Did you know?">You can reference Fluent 2 components directly from Figma.</MessageBar>
            <MessageBar intent="success" title="Changes saved" dismissible>Your settings have been saved successfully.</MessageBar>
            <MessageBar intent="warning" title="Action required" dismissible>Your session will expire in 5 minutes.</MessageBar>
            <MessageBar intent="error" title="Something went wrong">Failed to connect to the server. Please try again.</MessageBar>
          </div>
        </Section>

        {/* Tabs */}
        <Section title="Tabs">
          <div className="w-full">
            <Tabs defaultTab="overview" tabs={[
              { id: 'overview', label: 'Overview', icon: '▦', content: <p className="text-sm text-[#605E5C]">Overview content goes here.</p> },
              { id: 'details', label: 'Details', icon: '≡', content: <p className="text-sm text-[#605E5C]">Details content goes here.</p> },
              { id: 'history', label: 'History', icon: '⟳', content: <p className="text-sm text-[#605E5C]">History content goes here.</p> },
            ]} />
          </div>
        </Section>

      </div>
    </div>
  )
}
