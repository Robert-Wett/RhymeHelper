import { h, render, Component } from 'preact';
import { Well, PageHeader } from 'react-bootstrap';

const asJson = r => r.json();

class Container extends Component {
	state = {
		term: 'orange',
		loading: false,
		rhymes: []
	};

	loadRhymes = () => {
		if (this.state.loading || !this.state.term) {
			return;
		}

		this.setState({loading: true});

		fetch(`/api/${this.state.term}`)
			.then(asJson)
			.then(rhymes => {
				this.setState({rhymes, loading: false});
			})
			.catch(e => {
				this.setState({loading: false})
			});
	};

	handleChange(e) {
		this.setState({term: e.target.value});
		this.loadRhymes();
	}

	componentDidMount() {
		if (!this.state.rhymes.length)
			this.loadRhymes(this.state.term);
	}

	render({}, {term}={}){
		const rhymes = this.state.rhymes.map(r => {
			return (
				<Well>
					<p>{r.word}</p>
					<p># of phenomes matched: {r.strength}</p>
				</Well>
			);
		});

		return (
			<div className="container">
				<Header />
				<input
					type="text"
					placeholder="term to search..."
					value={ term }
					onChange={::this.handleChange}
				/>
				<div className="rhymeList">
					{rhymes}
				</div>
			</div>
		)
	}
}

const Header = () => <PageHeader>Rhyme Helper</PageHeader>;

render(<Container />, document.body);