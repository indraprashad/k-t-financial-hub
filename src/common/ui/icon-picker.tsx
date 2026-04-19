import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from './button';
import { Card } from './card';
import { Input } from './input';

// Import curated list of commonly used icons explicitly
import {
  Activity, Airplay, AlarmClock, AlertCircle, AlertTriangle, AlignCenter, AlignJustify,
  AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowBigDown, ArrowBigLeft, ArrowBigRight,
  ArrowBigUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, AtSign, Award, Backpack, Banknote,
  BarChart, BarChart2, BarChart3, BarChart4, Battery, BatteryCharging, BatteryFull,
  BatteryLow, BatteryMedium, BatteryWarning, Bell, BellDot, BellMinus, BellOff, BellPlus,
  BellRing, Bike, Binary, Binoculars, Bitcoin, Blinds, Blocks, Bluetooth, Bold, Book,
  BookA, BookCheck, BookCopy, BookDashed, BookDown, BookHeadphones, BookHeart, BookImage,
  BookKey, BookLock, BookMarked, BookMinus, BookOpen, BookOpenCheck, BookPlus, BookText,
  BookType, BookUp, BookUp2, BookUser, Bookmark, BookmarkCheck, BookmarkMinus, BookmarkPlus,
  BookmarkX, Bot, Box, BoxSelect, Boxes, Briefcase, Bug, Building, Building2, Bus, Cable,
  Calculator, Calendar, CalendarCheck, CalendarClock, CalendarDays, CalendarHeart,
  CalendarMinus, CalendarOff, CalendarPlus, CalendarRange, CalendarSearch, CalendarX,
  Camera, CameraOff, Car, CarFront, CarTaxiFront, Caravan, Carrot, CaseLower, CaseSensitive,
  CaseUpper, Cast, Castle, Cat, Check, CheckCheck, CheckCircle, CheckCircle2, CheckSquare,
  ChevronDown, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown,
  ChevronsDownUp, ChevronsLeft, ChevronsLeftRight, ChevronsRight, ChevronsUp, ChevronsUpDown,
  Chrome, Church, Cigarette, CigaretteOff, Circle, CircleDashed, CircleDollarSign, CircleDot,
  CircleDotDashed, CircleEllipsis, CircleEqual, CircleOff, CircleSlash, CircleSlash2,
  CircleUser, CircleUserRound, CircuitBoard, Citrus, Clapperboard, Clipboard, ClipboardCheck,
  ClipboardCopy, ClipboardEdit, ClipboardList, ClipboardPaste, ClipboardSignature,
  ClipboardType, ClipboardX, Clock, Clock1, Clock10, Clock11, Clock12, Clock2, Clock3,
  Clock4, Clock5, Clock6, Clock7, Clock8, Clock9, Cloud, CloudCog, CloudDrizzle, CloudFog,
  CloudHail, CloudLightning, CloudMoon, CloudMoonRain, CloudOff, CloudRain, CloudRainWind,
  CloudSnow, CloudSun, CloudSunRain, Cloudy, Clover, Club, Code, Code2, Codepen, Codesandbox,
  Coffee, Cog, Coins, Columns, Combine, Command, Compass, Component, ConciergeBell, Contact,
  Contact2, Contrast, Cookie, Copy, CopyCheck, CopyMinus, CopyPlus, CopySlash,
  CopyX, Copyright, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp,
  CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreativeCommons,
  CreditCard, Croissant, Crop, Cross, Crosshair, Crown, Currency,
  Database, DatabaseBackup, DatabaseZap, Delete, Diamond, Dice1, Dice2, Dice3, Dice4, Dice5,
  Dice6, Dices, Diff, Disc, Disc2, Disc3, Divide, DivideCircle, DivideSquare, Dna, DnaOff,
  Dog, DollarSign, Donut, DoorClosed, DoorOpen, Dot, Download, DownloadCloud, Dribbble,
  Droplet, Droplets, Drum, Dumbbell, Ear, EarOff, Edit, Edit2, Edit3, Egg, EggFried,
  EggOff, Equal, EqualNot, Eraser, Euro, Expand, ExternalLink, Eye, EyeOff, Facebook,
  Factory, Fan, FastForward, Feather, Figma, File, FileArchive, FileAudio, FileAudio2,
  FileAxis3D, FileBadge, FileBadge2, FileBarChart, FileBarChart2, FileBox, FileCheck,
  FileCheck2, FileClock, FileCode, FileCode2, FileCog, FileCog2, FileDiff, FileDigit,
  FileDown, FileEdit, FileHeart, FileImage, FileInput, FileJson, FileJson2, FileKey,
  FileKey2, FileLineChart, FileLock, FileLock2, FileMinus, FileMinus2, FileOutput,
  FilePieChart, FilePlus, FilePlus2, FileQuestion, FileScan, FileSearch, FileSearch2,
  FileSignature, FileSpreadsheet, FileStack, FileSymlink, FileTerminal, FileText, FileType,
  FileType2, FileUp, FileVideo, FileVideo2, FileVolume, FileVolume2, FileWarning, FileX,
  FileX2, Files, Film, Filter, FilterX, Fingerprint, Fish, FishOff, FishSymbol, Flag,
  FlagOff, FlagTriangleLeft, FlagTriangleRight, Flame, FlameKindling, Flashlight, FlashlightOff,
  FlaskConical, FlaskConicalOff, FlaskRound, FlipHorizontal, FlipHorizontal2, FlipVertical,
  FlipVertical2, Flower, Flower2, Focus, Folder, FolderArchive, FolderCheck, FolderClock,
  FolderClosed, FolderCog, FolderCog2, FolderDown, FolderEdit, FolderGit, FolderGit2, FolderHeart,
  FolderInput, FolderKanban, FolderKey, FolderLock, FolderMinus, FolderOpen, FolderOutput,
  FolderPlus, FolderRoot, FolderSearch, FolderSearch2, FolderSymlink, FolderTree, FolderUp,
  FolderX, Folders, Footprints, Forklift, FormInput, Forward, Frame, Framer, Frown, Fuel,
  FunctionSquare, Gamepad, Gamepad2, Gauge, Gavel, Gem, Ghost, Gift, GitBranch,
  GitBranchPlus, GitCommit, GitCommitHorizontal, GitCommitVertical, GitCompare, GitFork,
  GitGraph, GitMerge, GitPullRequest, GitPullRequestArrow, GitPullRequestClosed, GitPullRequestCreate,
  GitPullRequestCreateArrow, GitPullRequestDraft, Github, Gitlab, GlassWater, Glasses, Globe,
  Globe2, Goal, Grab, GraduationCap, Grape, Grid, Grid2X2, Grid3X3,
  Grip, GripHorizontal, GripVertical, Group, Guitar, Hammer, Hand, HandHelping, HandMetal,
  HandPlatter, HardDrive, HardHat, Hash, Haze, Heading, Heading1, Heading2, Heading3,
  Heading4, Heading5, Heading6, Headphones, Heart, HeartCrack, HeartHandshake, HeartOff,
  HeartPulse, HelpCircle, Hexagon, Highlighter, History, Home, Hop, HopOff, Hotel, Hourglass,
  IceCream, IceCream2, Image, ImageDown, ImageMinus, ImageOff, ImagePlus, Import, Inbox,
  Indent, IndentDecrease, IndentIncrease, IndianRupee, Infinity, Info, InspectionPanel,
  Instagram, Italic, IterationCw, JapaneseYen, Joystick, Key, Keyboard, KeyRound, KeySquare,
  Lamp, LampCeiling, LampDesk, LampFloor, LampWallDown, LampWallUp, Landmark, Languages,
  Laptop, Laptop2, Lasso, LassoSelect, Layers, Layers2, Layout, LayoutDashboard, LayoutGrid,
  LayoutList, LayoutPanelLeft, LayoutPanelTop, LayoutTemplate, Leaf, LeafyGreen, Library,
  LibraryBig, LibrarySquare, LifeBuoy, Ligature, Lightbulb, LightbulbOff, LineChart, Link,
  Link2, Link2Off, Linkedin, List, ListChecks, ListCollapse, ListEnd, ListFilter, ListMinus,
  ListMusic, ListOrdered, ListPlus, ListRestart, ListStart, ListTodo, ListTree, ListVideo,
  Loader, Loader2, Locate, LocateFixed, LocateOff, Lock, LockKeyhole, LockKeyholeOpen, LogIn,
  LogOut, Luggage, Magnet, Mail, MailCheck, MailMinus, MailOpen, MailPlus, MailQuestion,
  MailSearch, MailWarning, MailX, Mailbox, Mails, Map, MapPin, MapPinOff, MapPinned, Martini,
  Maximize, Maximize2, Medal, Megaphone, MegaphoneOff, Meh, MemoryStick, Menu, MenuSquare,
  Merge, MessageCircle, MessageCircleDashed, MessageCircleHeart, MessageCircleMore, MessageCircleOff,
  MessageCirclePlus, MessageCircleQuestion, MessageCircleWarning, MessageSquare, MessageSquareDashed,
  MessageSquareDiff, MessageSquareDot, MessageSquareMore, MessageSquareOff, MessageSquarePlus,
  MessageSquareQuote, MessageSquareShare, MessageSquareText, MessageSquareWarning, MessagesSquare,
  Mic, Mic2, MicOff, Microscope, Microwave, Milestone, Milk, MilkOff, Minimize, Minimize2,
  Minus, MinusCircle, MinusSquare, Monitor, MonitorCheck, MonitorDot, MonitorDown, MonitorOff,
  MonitorPause, MonitorPlay, MonitorSmartphone, MonitorSpeaker, MonitorStop, MonitorUp, MonitorX,
  Moon, MoonStar, MoreHorizontal, MoreVertical, Mountain, MountainSnow, Mouse, MousePointer,
  MousePointer2, MousePointerClick, Move, Move3D, MoveDiagonal, MoveDiagonal2, MoveDown,
  MoveDownLeft, MoveDownRight, MoveHorizontal, MoveLeft, MoveRight, MoveUp, MoveUpLeft,
  MoveUpRight, MoveVertical, Music, Music2, Music3, Music4, Navigation, Navigation2, Navigation2Off,
  NavigationOff, Network, Newspaper, Nfc, Notebook, NotebookPen, NotebookTabs, NotebookText, NotepadText,
  NotepadTextDashed, Nut, NutOff, Octagon, OctagonAlert, OctagonPause, OctagonX, Option, Orbit,
  Outdent, Package, Package2, PackageCheck, PackageMinus, PackageOpen, PackagePlus, PackageSearch,
  PackageX, PaintBucket, PaintRoller, Paintbrush, Paintbrush2, Palette, Palmtree, PanelBottom,
  PanelBottomClose, PanelBottomDashed, PanelBottomInactive, PanelBottomOpen, PanelLeft,
  PanelLeftClose, PanelLeftDashed, PanelLeftInactive, PanelLeftOpen, PanelRight, PanelRightClose,
  PanelRightDashed, PanelRightInactive, PanelRightOpen, PanelTop, PanelTopClose, PanelTopDashed,
  PanelTopInactive, PanelTopOpen, PanelsLeftBottom, PanelsRightBottom, Paperclip, Parentheses,
  ParkingCircle, ParkingCircleOff, ParkingMeter, ParkingSquare, ParkingSquareOff, PartyPopper,
  Pause, PauseCircle, PauseOctagon, PawPrint, PcCase, PenLine, PenTool, Pencil, PencilLine,
  PencilRuler, Pentagon, Percent, PercentCircle, PercentDiamond, PercentSquare, PersonStanding,
  Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing,
  Pi, PiSquare, PictureInPicture, PictureInPicture2, PieChart, PiggyBank, Pilcrow, PilcrowLeft,
  PilcrowRight, PilcrowSquare, Pill, Pin, PinOff, Pipette, Pizza, Plane, PlaneLanding,
  PlaneTakeoff, Play, PlayCircle, PlaySquare, Plug, Plug2, PlugZap, Plus, PlusCircle,
  PlusSquare, Pocket, Podcast, Pointer, PointerOff, Popcorn, Popsicle, PoundSterling,
  Power, PowerCircle, PowerOff, PowerSquare, Presentation, Printer, Projector, Proportions,
  Puzzle, QrCode, Quote, Rabbit, Radar, Radiation, Radio, RadioReceiver,
  RadioTower, Radius, RailSymbol, Rainbow, Rat, Receipt, ReceiptCent, ReceiptEuro, ReceiptIndianRupee,
  ReceiptJapaneseYen, ReceiptPoundSterling, ReceiptRussianRuble, ReceiptSwissFranc, ReceiptText,
  RectangleHorizontal, RectangleVertical, Recycle, Redo, Redo2, RedoDot, RefreshCcw, RefreshCw, RefreshCwOff, Refrigerator, Regex, RemoveFormatting, Repeat,
  Repeat1, Repeat2, Replace, ReplaceAll, Reply, ReplyAll, Rewind, Rocket, RockingChair, RollerCoaster,
  Rotate3D, RotateCcw, RotateCcwSquare, RotateCw, RotateCwSquare, Route, RouteOff, Router,
  Rows, Rows2, Rows3, Rows4, Rss, Ruler, RussianRuble, Sailboat, Salad,
  Sandwich, Satellite, SatelliteDish, Save, SaveAll, Scale, Scale3D, Scaling, Scan, ScanBarcode,
  ScanEye, ScanFace, ScanLine, ScanSearch, ScanText, School, School2, Scissors, ScissorsLineDashed,
  ScreenShare, ScreenShareOff, Scroll, ScrollText, SearchCheck, SearchCode, SearchSlash,
  SearchX, Send, SendHorizontal, SendToBack, SeparatorHorizontal, SeparatorVertical, Server,
  ServerCog, ServerCrash, ServerOff, Settings, Settings2, Shapes, Share, Share2, Sheet,
  Shell, Shield, ShieldAlert, ShieldBan, ShieldCheck, ShieldEllipsis, ShieldHalf, ShieldMinus,
  ShieldOff, ShieldPlus, ShieldQuestion, ShieldX, Ship, ShipWheel, Shirt, ShoppingBag,
  ShoppingBasket, ShoppingCart, Shovel, ShowerHead, Shrink, Shrub,
  Shuffle, Sigma, SigmaSquare, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero,
  Signpost, SignpostBig, Siren, SkipBack, SkipForward, Skull, Slack, Slash, Slice, Sliders,
  SlidersHorizontal, SlidersVertical, Smartphone, SmartphoneCharging, SmartphoneNfc, Smile,
  SmilePlus, Snail, Snowflake, Sofa, Soup, Space, Spade, Sparkle, Sparkles, Speaker,
  Speech, SpellCheck, SpellCheck2, Spline, Split, SplitSquareHorizontal, SplitSquareVertical,
  SprayCan, Sprout, Square, SquareAsterisk, SquareCode, SquareDashed, SquareDivide, SquareDot,
  SquareEqual, SquareFunction, SquareGanttChart, SquareKanban, SquareLibrary,
  SquareM, SquareMenu, SquareMinus, SquareParking, SquareParkingOff, SquarePen, SquarePercent,
  SquarePi, SquarePilcrow, SquarePlus, SquareRadical, SquareScissors, SquareSigma, SquareSlash,
  SquareSplitHorizontal, SquareSplitVertical, SquareStack, SquareTerminal, SquareUser, SquareUserRound,
  SquareX, Squircle, Squirrel,
  Stamp, Star, StarHalf, StarOff, StepBack, StepForward, Stethoscope, Sticker, StickyNote,
  StopCircle, Store, StretchHorizontal, StretchVertical, Strikethrough, Subscript, Subtitles,
  Sun, SunDim, SunMedium, SunMoon, Sunrise, Sunset, Superscript, SwissFranc, SwitchCamera,
  Sword, Swords, Syringe, Table, Table2, TableCellsMerge, TableCellsSplit, TableColumnsSplit,
  TableProperties, TableRowsSplit, Tablet, TabletSmartphone, Tablets, Tag, Tags, Target,
  Tent, TentTree, Terminal, TerminalSquare, TestTube, TestTube2, TestTubes, Text, TextCursor,
  TextCursorInput, TextQuote, TextSelect, TextSearch, Theater, Thermometer,
  ThermometerSnowflake, ThermometerSun, ThumbsDown, ThumbsUp, Ticket, TicketCheck, TicketMinus,
  TicketPercent, TicketPlus, TicketSlash, TicketX, Timer, TimerOff, TimerReset, ToggleLeft,
  ToggleRight, Tornado, Touchpad, TouchpadOff, TowerControl, ToyBrick, Tractor,
  TrafficCone, Train, TrainFront, TrainTrack, TramFront, Trash, Trash2, TreeDeciduous, TreePine,
  Trees, Trello, TrendingDown, TrendingUp, Triangle, TriangleAlert, TriangleRight, Trophy,
  Truck, Turtle, Tv, Tv2, Twitch, Twitter, Type, Umbrella, UmbrellaOff, Underline,
  Undo, Undo2, UndoDot, UnfoldHorizontal, UnfoldVertical, Ungroup, Unlink, Unlink2, Unlock,
  UnlockKeyhole, Unplug, Upload, UploadCloud, Usb, User, UserCheck, UserCog, UserMinus,
  UserPlus, UserRound, UserRoundCheck, UserRoundCog, UserRoundMinus, UserRoundPlus, UserRoundSearch,
  UserRoundX, UserSearch, UserX, Users, UsersRound, Utensils, UtensilsCrossed, UtilityPole,
  Variable, Vegan, VenetianMask, Vibrate, VibrateOff, Video, VideoOff, Videotape, View,
  Voicemail, Volume, Volume1, Volume2, VolumeX, Vote, Wallet, WalletCards, WalletMinimal,
  Wallpaper, Wand, Wand2, Warehouse, Watch, Waves, Waypoints, Webcam, Webhook, Weight,
  Wheat, WheatOff, WholeWord, Wifi, WifiOff, Wind, Wine, WineOff, Workflow, Worm, WrapText,
  Wrench, X, XCircle, XOctagon, XSquare, Youtube, Zap, ZapOff, ZoomIn, ZoomOut
} from 'lucide-react';

// Create curated icon mapping
const iconMap: Record<string, LucideIcon> = {
  Activity, Airplay, AlarmClock, AlertCircle, AlertTriangle, AlignCenter, AlignJustify,
  AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowBigDown, ArrowBigLeft, ArrowBigRight,
  ArrowBigUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, AtSign, Award, Backpack, Banknote,
  BarChart, BarChart2, BarChart3, BarChart4, Battery, BatteryCharging, BatteryFull,
  BatteryLow, BatteryMedium, BatteryWarning, Bell, BellDot, BellMinus, BellOff, BellPlus,
  BellRing, Bike, Binary, Binoculars, Bitcoin, Blinds, Blocks, Bluetooth, Bold, Book,
  BookA, BookCheck, BookCopy, BookDashed, BookDown, BookHeadphones, BookHeart, BookImage,
  BookKey, BookLock, BookMarked, BookMinus, BookOpen, BookOpenCheck, BookPlus, BookText,
  BookType, BookUp, BookUp2, BookUser, Bookmark, BookmarkCheck, BookmarkMinus, BookmarkPlus,
  BookmarkX, Bot, Box, BoxSelect, Boxes, Briefcase, Bug, Building, Building2, Bus, Cable,
  Calculator, Calendar, CalendarCheck, CalendarClock, CalendarDays, CalendarHeart,
  CalendarMinus, CalendarOff, CalendarPlus, CalendarRange, CalendarSearch, CalendarX,
  Camera, CameraOff, Car, CarFront, CarTaxiFront, Caravan, Carrot, CaseLower, CaseSensitive,
  CaseUpper, Cast, Castle, Cat, Check, CheckCheck, CheckCircle, CheckCircle2, CheckSquare,
  ChevronDown, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown,
  ChevronsDownUp, ChevronsLeft, ChevronsLeftRight, ChevronsRight, ChevronsUp, ChevronsUpDown,
  Chrome, Church, Cigarette, CigaretteOff, Circle, CircleDashed, CircleDollarSign, CircleDot,
  CircleDotDashed, CircleEllipsis, CircleEqual, CircleOff, CircleSlash, CircleSlash2,
  CircleUser, CircleUserRound, CircuitBoard, Citrus, Clapperboard, Clipboard, ClipboardCheck,
  ClipboardCopy, ClipboardEdit, ClipboardList, ClipboardPaste, ClipboardSignature,
  ClipboardType, ClipboardX, Clock, Clock1, Clock10, Clock11, Clock12, Clock2, Clock3,
  Clock4, Clock5, Clock6, Clock7, Clock8, Clock9, Cloud, CloudCog, CloudDrizzle, CloudFog,
  CloudHail, CloudLightning, CloudMoon, CloudMoonRain, CloudOff, CloudRain, CloudRainWind,
  CloudSnow, CloudSun, CloudSunRain, Cloudy, Clover, Club, Code, Code2, Codepen, Codesandbox,
  Coffee, Cog, Coins, Columns, Combine, Command, Compass, Component, ConciergeBell, Contact,
  Contact2, Contrast, Cookie, Copy, CopyCheck, CopyMinus, CopyPlus, CopySlash,
  CopyX, Copyright, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp,
  CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreativeCommons,
  CreditCard, Croissant, Crop, Cross, Crosshair, Crown, Currency,
  Database, DatabaseBackup, DatabaseZap, Delete, Diamond, Dice1, Dice2, Dice3, Dice4, Dice5,
  Dice6, Dices, Diff, Disc, Disc2, Disc3, Divide, DivideCircle, DivideSquare, Dna, DnaOff,
  Dog, DollarSign, Donut, DoorClosed, DoorOpen, Dot, Download, DownloadCloud, Dribbble,
  Droplet, Droplets, Drum, Dumbbell, Ear, EarOff, Edit, Edit2, Edit3, Egg, EggFried,
  EggOff, Equal, EqualNot, Eraser, Euro, Expand, ExternalLink, Eye, EyeOff, Facebook,
  Factory, Fan, FastForward, Feather, Figma, File, FileArchive, FileAudio, FileAudio2,
  FileAxis3D, FileBadge, FileBadge2, FileBarChart, FileBarChart2, FileBox, FileCheck,
  FileCheck2, FileClock, FileCode, FileCode2, FileCog, FileCog2, FileDiff, FileDigit,
  FileDown, FileEdit, FileHeart, FileImage, FileInput, FileJson, FileJson2, FileKey,
  FileKey2, FileLineChart, FileLock, FileLock2, FileMinus, FileMinus2, FileOutput,
  FilePieChart, FilePlus, FilePlus2, FileQuestion, FileScan, FileSearch, FileSearch2,
  FileSignature, FileSpreadsheet, FileStack, FileSymlink, FileTerminal, FileText, FileType,
  FileType2, FileUp, FileVideo, FileVideo2, FileVolume, FileVolume2, FileWarning, FileX,
  FileX2, Files, Film, Filter, FilterX, Fingerprint, Fish, FishOff, FishSymbol, Flag,
  FlagOff, FlagTriangleLeft, FlagTriangleRight, Flame, FlameKindling, Flashlight, FlashlightOff,
  FlaskConical, FlaskConicalOff, FlaskRound, FlipHorizontal, FlipHorizontal2, FlipVertical,
  FlipVertical2, Flower, Flower2, Focus, Folder, FolderArchive, FolderCheck, FolderClock,
  FolderClosed, FolderCog, FolderCog2, FolderDown, FolderEdit, FolderGit, FolderGit2, FolderHeart,
  FolderInput, FolderKanban, FolderKey, FolderLock, FolderMinus, FolderOpen, FolderOutput,
  FolderPlus, FolderRoot, FolderSearch, FolderSearch2, FolderSymlink, FolderTree, FolderUp,
  FolderX, Folders, Footprints, Forklift, FormInput, Forward, Frame, Framer, Frown, Fuel,
  FunctionSquare, Gamepad, Gamepad2, Gauge, Gavel, Gem, Ghost, Gift, GitBranch,
  GitBranchPlus, GitCommit, GitCommitHorizontal, GitCommitVertical, GitCompare, GitFork,
  GitGraph, GitMerge, GitPullRequest, GitPullRequestArrow, GitPullRequestClosed, GitPullRequestCreate,
  GitPullRequestCreateArrow, GitPullRequestDraft, Github, Gitlab, GlassWater, Glasses, Globe,
  Globe2, Goal, Grab, GraduationCap, Grape, Grid, Grid3X3, Grid2X2,
  Grip, GripHorizontal, GripVertical, Group, Guitar, Hammer, Hand, HandHelping, HandMetal,
  HandPlatter, HardDrive, HardHat, Hash, Haze, Heading, Heading1, Heading2, Heading3,
  Heading4, Heading5, Heading6, Headphones, Heart, HeartCrack, HeartHandshake, HeartOff,
  HeartPulse, HelpCircle, Hexagon, Highlighter, History, Home, Hop, HopOff, Hotel, Hourglass,
  IceCream, IceCream2, Image, ImageDown, ImageMinus, ImageOff, ImagePlus, Import, Inbox,
  Indent, IndentDecrease, IndentIncrease, IndianRupee, Infinity, Info, InspectionPanel,
  Instagram, Italic, IterationCw, JapaneseYen, Joystick, Key, Keyboard, KeyRound, KeySquare,
  Lamp, LampCeiling, LampDesk, LampFloor, LampWallDown, LampWallUp, Landmark, Languages,
  Laptop, Laptop2, Lasso, LassoSelect, Layers, Layers2, Layout, LayoutDashboard, LayoutGrid,
  LayoutList, LayoutPanelLeft, LayoutPanelTop, LayoutTemplate, Leaf, LeafyGreen, Library,
  LibraryBig, LibrarySquare, LifeBuoy, Ligature, Lightbulb, LightbulbOff, LineChart, Link,
  Link2, Link2Off, Linkedin, List, ListChecks, ListCollapse, ListEnd, ListFilter, ListMinus,
  ListMusic, ListOrdered, ListPlus, ListRestart, ListStart, ListTodo, ListTree, ListVideo,
  Loader, Loader2, Locate, LocateFixed, LocateOff, Lock, LockKeyhole, LockKeyholeOpen, LogIn,
  LogOut, Luggage, Magnet, Mail, MailCheck, MailMinus, MailOpen, MailPlus, MailQuestion,
  MailSearch, MailWarning, MailX, Mailbox, Mails, Map, MapPin, MapPinOff, MapPinned, Martini,
  Maximize, Maximize2, Medal, Megaphone, MegaphoneOff, Meh, MemoryStick, Menu, MenuSquare,
  Merge, MessageCircle, MessageCircleDashed, MessageCircleHeart, MessageCircleMore, MessageCircleOff,
  MessageCirclePlus, MessageCircleQuestion, MessageCircleWarning, MessageSquare, MessageSquareDashed,
  MessageSquareDiff, MessageSquareDot, MessageSquareMore, MessageSquareOff, MessageSquarePlus,
  MessageSquareQuote, MessageSquareShare, MessageSquareText, MessageSquareWarning, MessagesSquare,
  Mic, Mic2, MicOff, Microscope, Microwave, Milestone, Milk, MilkOff, Minimize, Minimize2,
  Minus, MinusCircle, MinusSquare, Monitor, MonitorCheck, MonitorDot, MonitorDown, MonitorOff,
  MonitorPause, MonitorPlay, MonitorSmartphone, MonitorSpeaker, MonitorStop, MonitorUp, MonitorX,
  Moon, MoonStar, MoreHorizontal, MoreVertical, Mountain, MountainSnow, Mouse, MousePointer,
  MousePointer2, MousePointerClick, Move, Move3D, MoveDiagonal, MoveDiagonal2, MoveDown,
  MoveDownLeft, MoveDownRight, MoveHorizontal, MoveLeft, MoveRight, MoveUp, MoveUpLeft,
  MoveUpRight, MoveVertical, Music, Music2, Music3, Music4, Navigation, Navigation2, Navigation2Off,
  NavigationOff, Network, Newspaper, Nfc, Notebook, NotebookPen, NotebookTabs, NotebookText, NotepadText,
  NotepadTextDashed, Nut, NutOff, Octagon, OctagonAlert, OctagonPause, OctagonX, Option, Orbit,
  Outdent, Package, Package2, PackageCheck, PackageMinus, PackageOpen, PackagePlus, PackageSearch,
  PackageX, PaintBucket, PaintRoller, Paintbrush, Paintbrush2, Palette, Palmtree, PanelBottom,
  PanelBottomClose, PanelBottomDashed, PanelBottomInactive, PanelBottomOpen, PanelLeft,
  PanelLeftClose, PanelLeftDashed, PanelLeftInactive, PanelLeftOpen, PanelRight, PanelRightClose,
  PanelRightDashed, PanelRightInactive, PanelRightOpen, PanelTop, PanelTopClose, PanelTopDashed,
  PanelTopInactive, PanelTopOpen, PanelsLeftBottom, PanelsRightBottom, Paperclip, Parentheses,
  ParkingCircle, ParkingCircleOff, ParkingMeter, ParkingSquare, ParkingSquareOff, PartyPopper,
  Pause, PauseCircle, PauseOctagon, PawPrint, PcCase, PenLine, PenTool, Pencil, PencilLine,
  PencilRuler, Pentagon, Percent, PercentCircle, PercentDiamond, PercentSquare, PersonStanding,
  Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing,
  Pi, PiSquare, PictureInPicture, PictureInPicture2, PieChart, PiggyBank, Pilcrow, PilcrowLeft,
  PilcrowRight, PilcrowSquare, Pill, Pin, PinOff, Pipette, Pizza, Plane, PlaneLanding,
  PlaneTakeoff, Play, PlayCircle, PlaySquare, Plug, Plug2, PlugZap, Plus, PlusCircle,
  PlusSquare, Pocket, Podcast, Pointer, PointerOff, Popcorn, Popsicle, PoundSterling,
  Power, PowerCircle, PowerOff, PowerSquare, Presentation, Printer, Projector, Proportions,
  Puzzle, QrCode, Quote, Rabbit, Radar, Radiation, Radio, RadioReceiver,
  RadioTower, Radius, RailSymbol, Rainbow, Rat, Receipt, ReceiptCent, ReceiptEuro, ReceiptIndianRupee,
  ReceiptJapaneseYen, ReceiptPoundSterling, ReceiptRussianRuble, ReceiptSwissFranc, ReceiptText,
  RectangleHorizontal, RectangleVertical, Recycle, Redo, Redo2, RedoDot, RefreshCcw, RefreshCw, RefreshCwOff, Refrigerator, Regex, RemoveFormatting, Repeat,
  Repeat1, Repeat2, Replace, ReplaceAll, Reply, ReplyAll, Rewind, Rocket, RockingChair, RollerCoaster,
  Rotate3D, RotateCcw, RotateCcwSquare, RotateCw, RotateCwSquare, Route, RouteOff, Router,
  Rows, Rows2, Rows3, Rows4, Rss, Ruler, RussianRuble, Sailboat, Salad,
  Sandwich, Satellite, SatelliteDish, Save, SaveAll, Scale, Scale3D, Scaling, Scan, ScanBarcode,
  ScanEye, ScanFace, ScanLine, ScanSearch, ScanText, School, School2, Scissors, ScissorsLineDashed,
  ScreenShare, ScreenShareOff, Scroll, ScrollText, Search, SearchCheck, SearchCode, SearchSlash,
  SearchX, Send, SendHorizontal, SendToBack, SeparatorHorizontal, SeparatorVertical, Server,
  ServerCog, ServerCrash, ServerOff, Settings, Settings2, Shapes, Share, Share2, Sheet,
  Shell, Shield, ShieldAlert, ShieldBan, ShieldCheck, ShieldEllipsis, ShieldHalf, ShieldMinus,
  ShieldOff, ShieldPlus, ShieldQuestion, ShieldX, Ship, ShipWheel, Shirt, ShoppingBag,
  ShoppingBasket, ShoppingCart, Shovel, ShowerHead, Shrink, Shrub,
  Shuffle, Sigma, SigmaSquare, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero,
  Signpost, SignpostBig, Siren, SkipBack, SkipForward, Skull, Slack, Slash, Slice, Sliders,
  SlidersHorizontal, SlidersVertical, Smartphone, SmartphoneCharging, SmartphoneNfc, Smile,
  SmilePlus, Snail, Snowflake, Sofa, Soup, Space, Spade, Sparkle, Sparkles, Speaker,
  Speech, SpellCheck, SpellCheck2, Spline, Split, SplitSquareHorizontal, SplitSquareVertical,
  SprayCan, Sprout, Square, SquareAsterisk, SquareCode, SquareDashed, SquareDivide, SquareDot,
  SquareEqual, SquareFunction, SquareGanttChart, SquareKanban, SquareLibrary,
  SquareM, SquareMenu, SquareMinus, SquareParking, SquareParkingOff, SquarePen, SquarePercent,
  SquarePi, SquarePilcrow, SquarePlus, SquareRadical, SquareScissors, SquareSigma, SquareSlash,
  SquareSplitHorizontal, SquareSplitVertical, SquareStack, SquareTerminal, SquareUser, SquareUserRound,
  SquareX, Squircle, Squirrel,
  Stamp, Star, StarHalf, StarOff, StepBack, StepForward, Stethoscope, Sticker, StickyNote,
  StopCircle, Store, StretchHorizontal, StretchVertical, Strikethrough, Subscript, Subtitles,
  Sun, SunDim, SunMedium, SunMoon, Sunrise, Sunset, Superscript, SwissFranc, SwitchCamera,
  Sword, Swords, Syringe, Table, Table2, TableCellsMerge, TableCellsSplit, TableColumnsSplit,
  TableProperties, TableRowsSplit, Tablet, TabletSmartphone, Tablets, Tag, Tags, Target,
  Tent, TentTree, Terminal, TerminalSquare, TestTube, TestTube2, TestTubes, Text, TextCursor,
  TextCursorInput, TextQuote, TextSelect, TextSearch, Theater, Thermometer,
  ThermometerSnowflake, ThermometerSun, ThumbsDown, ThumbsUp, Ticket, TicketCheck, TicketMinus,
  TicketPercent, TicketPlus, TicketSlash, TicketX, Timer, TimerOff, TimerReset, ToggleLeft,
  ToggleRight, Tornado, Touchpad, TouchpadOff, TowerControl, ToyBrick, Tractor,
  TrafficCone, Train, TrainFront, TrainTrack, TramFront, Trash, Trash2, TreeDeciduous, TreePine,
  Trees, Trello, TrendingDown, TrendingUp, Triangle, TriangleAlert, TriangleRight, Trophy,
  Truck, Turtle, Tv, Tv2, Twitch, Twitter, Type, Umbrella, UmbrellaOff, Underline,
  Undo, Undo2, UndoDot, UnfoldHorizontal, UnfoldVertical, Ungroup, Unlink, Unlink2, Unlock,
  UnlockKeyhole, Unplug, Upload, UploadCloud, Usb, User, UserCheck, UserCog, UserMinus,
  UserPlus, UserRound, UserRoundCheck, UserRoundCog, UserRoundMinus, UserRoundPlus, UserRoundSearch,
  UserRoundX, UserSearch, UserX, Users, UsersRound, Utensils, UtensilsCrossed, UtilityPole,
  Variable, Vegan, VenetianMask, Vibrate, VibrateOff, Video, VideoOff, Videotape, View,
  Voicemail, Volume, Volume1, Volume2, VolumeX, Vote, Wallet, WalletCards, WalletMinimal,
  Wallpaper, Wand, Wand2, Warehouse, Watch, Waves, Waypoints, Webcam, Webhook, Weight,
  Wheat, WheatOff, WholeWord, Wifi, WifiOff, Wind, Wine, WineOff, Workflow, Worm, WrapText,
  Wrench, X, XCircle, XOctagon, XSquare, Youtube, Zap, ZapOff, ZoomIn, ZoomOut
};

// Get all icon names
const allIcons = Object.keys(iconMap);

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  placeholder = 'Select an icon',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter icons based on search term
  const filteredIcons = allIcons.filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayIcons = searchTerm ? filteredIcons : allIcons;

  // Safe selected icon
  const SelectedIconComponent: LucideIcon | null = value && iconMap[value] ? iconMap[value] : null;

  const handleIconSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative">
      {/* Selected Icon */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="flex items-center gap-2 w-full justify-start"
        >
          {SelectedIconComponent ? (
            <SelectedIconComponent size={16} />
          ) : (
            <div className="w-4 h-4 border-2 border-dashed border-gray-300 rounded" />
          )}
          <span className="text-sm">
            {value || placeholder}
          </span>
        </Button>

        {value && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="p-1 h-8 w-8"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Choose an Icon</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>

              {/* Icon Grid */}
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-96 overflow-y-auto p-2">
                {displayIcons.map((iconName) => {
                  const IconComponent = iconMap[iconName];

                  // ✅ Absolute safety check
                  if (!IconComponent) return null;

                  return (
                    <Button
                      key={iconName}
                      type="button"
                      variant={value === iconName ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleIconSelect(iconName)}
                      className="p-2 h-12 w-12 flex items-center justify-center"
                      title={iconName}
                    >
                      <IconComponent size={16} />
                    </Button>
                  );
                })}
              </div>

              {/* Empty State */}
              {displayIcons.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No icons found for "{searchTerm}"
                </div>
              )}

            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default IconPicker;