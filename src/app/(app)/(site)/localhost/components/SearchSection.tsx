import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
	Panel,
	PanelContent,
	PanelFooter,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import { SEARCH_ENGINES } from '../constants';
import { SearchEngine } from '../types';

export const SearchSection: React.FC = () => {
	const [query, setQuery] = useState('');
	const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(
		SearchEngine.Google,
	);

	const handleSearch = () => {
		if (!query.trim()) {
			toast.error('Veuillez remplir le champ avant de continuer.');
			return;
		}

		const engine = SEARCH_ENGINES.find(
			({ name }) => name === selectedEngine,
		);
		if (engine) {
			const url: string = `${engine.url}${encodeURIComponent(query)}`;
			window.open(url, '_blank');
			setQuery('');
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<Panel className="!border-x-0">
			<PanelHeader>
				<PanelTitle>Recherche sur Internet</PanelTitle>
			</PanelHeader>

			<PanelContent className="flex items-center gap-x-3">
				<Select
					onValueChange={(value) =>
						setSelectedEngine(value as SearchEngine)
					}
					value={selectedEngine}
				>
					<SelectTrigger>
						<SelectValue placeholder={selectedEngine} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{SEARCH_ENGINES.map(({ name }) => (
								<SelectItem key={name} value={name}>
									{name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Input
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setQuery(event.target.value)
					}
					onKeyDown={handleKeyPress}
					onKeyUp={handleKeyPress}
					placeholder="Rechercher sur le web ..."
					type="text"
					value={query}
				/>
			</PanelContent>

			<PanelFooter className="flex justify-end gap-4">
				<Button onClick={handleSearch}>
					<MagnifyingGlassIcon />
					Effectuer la recherche
				</Button>
			</PanelFooter>
		</Panel>
	);
};
