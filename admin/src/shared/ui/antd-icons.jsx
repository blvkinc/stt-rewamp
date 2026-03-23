import React from 'react'
import {
  Crosshair,
  AlertTriangle,
  LayoutGrid,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Landmark,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  Check,
  Clock,
  XCircle,
  X,
  Copy,
  CreditCard,
  Crown,
  LayoutDashboard,
  Database,
  Trash2,
  DollarSign,
  Download,
  Edit3,
  MapPin,
  AlertCircle,
  EyeOff,
  Eye,
  FileText,
  Filter,
  Folder,
  Gift,
  Globe,
  Home,
  Inbox,
  Instagram,
  Link as LinkIcon,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  MoreHorizontal,
  PauseCircle,
  Percent,
  Phone,
  PieChart,
  PlayCircle,
  Plus,
  HelpCircle,
  Redo2,
  ChevronRight,
  TrendingUp,
  Rocket,
  ShieldCheck,
  Shield,
  Save,
  Search,
  Settings,
  Store,
  Star,
  Square,
  Tag,
  Tags,
  Users,
  Zap,
  Upload,
  UserPlus,
  User,
} from 'lucide-react'

const wrap = (Icon, filled = false) => (props) => (
  <Icon {...props} fill={filled ? 'currentColor' : props.fill} />
)

export const AimOutlined = wrap(Crosshair)
export const AlertOutlined = wrap(AlertTriangle)
export const AppstoreOutlined = wrap(LayoutGrid)
export const ArrowDownOutlined = wrap(ArrowDown)
export const ArrowLeftOutlined = wrap(ArrowLeft)
export const ArrowUpOutlined = wrap(ArrowUp)
export const BankOutlined = wrap(Landmark)
export const BarChartOutlined = wrap(BarChart3)
export const BellOutlined = wrap(Bell)
export const CalendarOutlined = wrap(Calendar)
export const CheckCircleOutlined = wrap(CheckCircle2)
export const CheckOutlined = wrap(Check)
export const ClockCircleOutlined = wrap(Clock)
export const CloseCircleOutlined = wrap(XCircle)
export const CloseOutlined = wrap(X)
export const CopyOutlined = wrap(Copy)
export const CreditCardOutlined = wrap(CreditCard)
export const CrownFilled = wrap(Crown, true)
export const DashboardOutlined = wrap(LayoutDashboard)
export const DatabaseOutlined = wrap(Database)
export const DeleteOutlined = wrap(Trash2)
export const DollarOutlined = wrap(DollarSign)
export const DownloadOutlined = wrap(Download)
export const EditOutlined = wrap(Edit3)
export const EnvironmentOutlined = wrap(MapPin)
export const ExclamationCircleOutlined = wrap(AlertCircle)
export const EyeInvisibleOutlined = wrap(EyeOff)
export const EyeOutlined = wrap(Eye)
export const FileTextOutlined = wrap(FileText)
export const FilterOutlined = wrap(Filter)
export const FolderOutlined = wrap(Folder)
export const GiftOutlined = wrap(Gift)
export const GlobalOutlined = wrap(Globe)
export const HomeOutlined = wrap(Home)
export const InboxOutlined = wrap(Inbox)
export const InstagramOutlined = wrap(Instagram)
export const LinkOutlined = wrap(LinkIcon)
export const LockOutlined = wrap(Lock)
export const LogoutOutlined = wrap(LogOut)
export const MailOutlined = wrap(Mail)
export const MenuOutlined = wrap(Menu)
export const MessageOutlined = wrap(MessageSquare)
export const MoreOutlined = wrap(MoreHorizontal)
export const PauseCircleOutlined = wrap(PauseCircle)
export const PercentageOutlined = wrap(Percent)
export const PhoneOutlined = wrap(Phone)
export const PieChartOutlined = wrap(PieChart)
export const PlayCircleOutlined = wrap(PlayCircle)
export const PlusOutlined = wrap(Plus)
export const QuestionCircleOutlined = wrap(HelpCircle)
export const RedoOutlined = wrap(Redo2)
export const RightOutlined = wrap(ChevronRight)
export const RiseOutlined = wrap(TrendingUp)
export const RocketOutlined = wrap(Rocket)
export const SafetyCertificateOutlined = wrap(ShieldCheck)
export const SafetyOutlined = wrap(Shield)
export const SaveOutlined = wrap(Save)
export const SearchOutlined = wrap(Search)
export const SettingOutlined = wrap(Settings)
export const ShopOutlined = wrap(Store)
export const StarFilled = wrap(Star, true)
export const StarOutlined = wrap(Star)
export const StopOutlined = wrap(Square)
export const TagOutlined = wrap(Tag)
export const TagsOutlined = wrap(Tags)
export const TeamOutlined = wrap(Users)
export const ThunderboltOutlined = wrap(Zap)
export const UploadOutlined = wrap(Upload)
export const UserAddOutlined = wrap(UserPlus)
export const UserOutlined = wrap(User)
export const WarningOutlined = wrap(AlertTriangle)

export const FacebookOutlined = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V12H8v3h2v6h3v-6h2.5l.5-3H13V9.5c0-.28.22-.5.5-.5Z" />
  </svg>
)

export const TwitterOutlined = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.9 7.1c.01.14.01.29.01.43 0 4.36-3.32 9.38-9.38 9.38-1.86 0-3.6-.54-5.05-1.47.26.03.52.04.79.04 1.54 0 2.96-.52 4.09-1.41a3.3 3.3 0 0 1-3.08-2.29c.2.03.4.05.62.05.3 0 .6-.04.88-.12a3.29 3.29 0 0 1-2.64-3.23v-.04c.45.25.97.4 1.52.42a3.29 3.29 0 0 1-1.47-2.74c0-.6.16-1.16.44-1.64a9.34 9.34 0 0 0 6.78 3.44 3.29 3.29 0 0 1 5.6-3 6.55 6.55 0 0 0 2.09-.8 3.29 3.29 0 0 1-1.44 1.82 6.6 6.6 0 0 0 1.89-.52 7.06 7.06 0 0 1-1.64 1.7Z" />
  </svg>
)

export const InstagramOutlined = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  </svg>
)
