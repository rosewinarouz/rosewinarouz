import styles from './Topbar.module.css';

interface TopbarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearchSubmit?: () => void;
}

export default function RadioTopbar({ searchQuery, setSearchQuery, onSearchSubmit }: TopbarProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onSearchSubmit) {
            onSearchSubmit();
        }
    };

    return (
        <header className={styles.topbar}>
            <div className={styles.searchContainer} role="search">
                <input
                    type="text"
                    placeholder="Rechercher un média..."
                    aria-label="Rechercher un média"
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </header>
    );
}
