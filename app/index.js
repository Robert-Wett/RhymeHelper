import { h, render, Component } from 'preact';
import { Well, PageHeader } from 'react-bootstrap';

const styles = {
	rhymeList: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginTop: 25
	},

	rhymeEntry: {
		strength: {
			border: "1px solid darkgrey",
			marginTop: 10,
			padding: "1px 2px 1px 2px"
		},

		word: {
			fontSize: "1.1em",
			fontWeight: 500,
			letterSpacing: "2px",
			marginLeft: 10,
			textTransform: "uppercase"
		}
	}

};

const asJson = r => r.json();

const Header = () => <PageHeader>Rhyme Helper</PageHeader>;

const Rhyme = ({ rhymeData }) => (
	<Well>
		<p>
			<span style={{ ...styles.rhymeEntry.strength }}>
					{ rhymeData.strength }
			</span>
			<span style={{ ...styles.rhymeEntry.word }}>
					{ rhymeData.word }
			</span>
		</p>
	</Well>
);


class Model {
	constructor() {
		this.cache = new Map();
	}

	_makeGetRequest(term) {
		return new Promise(resolve => {
			fetch(`/api/${term}`)
				.then(asJson)
				.then(rhymes => {
					resolve([term, rhymes]);
				})
				.catch(e => {
					resolve([term, []]);
				});
		});
	}

	_cacheAndReturnTermRhymes = (termArray) => {
		this.cache.set(termArray[0], termArray[1]);
		return Promise.resolve(termArray[1]);
	}


	search(term) {
		const _term = term.toLowerCase();

		if (this.cache.has(_term)) {
			return Promise.resolve(this.cache.get(_term))
		}

		return this._makeGetRequest(_term)
			.then(this._cacheAndReturnTermRhymes)
	}
}

class Container extends Component {
	state = {
		term: 'orange',
		loading: false,
		rhymes: [],
		model: new Model()
	};

	loadRhymes = (term) => {
		this.setState({ term, loading: true });
		this.state.model.search(term)
			.then(rhymes => this.setState({ rhymes, loading: false }));
	};

	handleChange(e) {
		const _term = e.target.value.toLowerCase();

		if (this.state.loading || !_term || _term === this.state.term) {
			return;
		}

		this.loadRhymes(_term);
	}

	componentDidMount() {
		if (!this.state.rhymes.length)
			this.loadRhymes(this.state.term, true);
	}

	render({}, {term}={}){
		return (
			<div className="container">
				<Header />
				<input
					type="text"
					placeholder="term to search..."
					value={ term }
					onChange={::this.handleChange}
				/>
				<div style={{ ...styles.rhymeList }}>
					{ this.state.rhymes.slice(0, 50).map(r => <Rhyme rhymeData={r} />) }
				</div>
			</div>
		)
	}
}

render(<Container />, document.body);