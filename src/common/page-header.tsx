import { useIsMobile } from '../utils/use-mobile'
import { ReactNode } from 'react'

interface PageHeaderProps {
    title: string
    subtitle: string
    buttonLabel?: string
    buttonIcon?: ReactNode
    onButtonClick?: () => void
    rightSlot?: ReactNode
}

const PageHeader = ({ title, subtitle, buttonLabel, buttonIcon, onButtonClick, rightSlot }: PageHeaderProps) => {
    const isMobile = useIsMobile()

    return (
        <div className={`mt-2 bg-white rounded-lg shadow ${isMobile ? 'p-4 flex flex-col space-y-4' : 'p-6 flex items-center justify-between'}`}>
            <div>
                <h1 className={`font-bold text-slate-900 ${isMobile ? 'text-xl' : 'text-3xl'}`}>{title}</h1>
                <p className={`text-slate-600 ${isMobile ? 'text-xs mt-1' : 'mt-2 text-sm'}`}>{subtitle}</p>
            </div>
            {rightSlot || (buttonLabel && (
                <button
                    type="button"
                    onClick={onButtonClick}
                    className={`bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2 ${isMobile ? 'w-full justify-center py-2 px-3 text-sm' : 'px-4 py-2'}`}
                >
                    {buttonIcon && buttonIcon}
                    <span>{buttonLabel}</span>
                </button>
            ))}
        </div>
    )
}

export default PageHeader