import { h, render, Component } from 'preact';
import { Well, PageHeader } from 'react-bootstrap';

class Header extends Component {
	render() {
		return (
			<PageHeader>Rhyme Helper</PageHeader>
		);
	}
}

class Clock extends Component {
	state = {
		words: []
	}

	componentWillMount() {
		fetch('/orange').then(r => r.json()).then(words => this.setState({words: words.map(w => w.display)}));
	}
	
	render() {
		return (
			<div>
				{this.state.words.map(w => <Well>{w}</Well>)}
			</div>
		)
	}
}

class TermForm extends

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Clock />
			</div>
		);
	}
}
// render an instance of Clock into <body>:
render(<App />, document.body);

class RhymeItems extends Component {
	state = {
		words: [],
		term: '',
		loading: false,
		refreshing: false
	};

	componentDidMount() {
		this.setState({ term: this.props.term });
	}

	componentWillReceiveProps({ term }) {
		if (terms!==this.state.term) {
			this.setState({ term });
		}
	}

	render({ }, { term, words, loading }={}) {
		if (term && term !== this.term && !loading) this.more();

		return (
			<div class="rhyme-item-list">
				{ words.map( (word, i) => (
					<RhymeItem key={ word.word + i } { ...word } />
				)) }
			</div>
		);
	}
}

	/*

class RhymeItem extends Component {
  shouldComponentUpdate({ id }) {
    return id !== this.props.id;
  }

  render({ word, display, strength }) {
    return (
      <div class="rhyme-item">
        <h2>{ word }</h2>
        <div class="rhyme-item-container">
          <ul>
            <li>{ display }</li>
            <li>Strength: { strength }</li>
          </ul>
        </div>
      </div>
    )
  }
}

class BigLetters extends Component {
  render({ text }) {
    return <h1>{ text.toUpperCase() }</h1>;
  }
}


const getPayload = () => {
  return [{"word":"CHALLENGE","display":"[3] CHALLENGE: CH AE1 L AH0 N JH","strength":3},{"word":"ALONGE","display":"[3] ALONGE: AE1 L AH0 N JH","strength":3},{"word":"COUNTERCHALLENGE","display":"[3] COUNTERCHALLENGE: K AW1 N T ER0 CH AE2 L AH0 N JH","strength":3},{"word":"COUNTERCHALLENGE(1)","display":"[3] COUNTERCHALLENGE(1): K AW1 N ER0 CH AE2 L AH0 N JH","strength":3},{"word":"LOZENGE","display":"[3] LOZENGE: L AO1 Z AH0 N JH","strength":3},{"word":"SCAVENGE","display":"[3] SCAVENGE: S K AE1 V AH0 N JH","strength":3},{"word":"BINGE","display":"[2] BINGE: B IH1 N JH","strength":2},{"word":"DERANGE","display":"[2] DERANGE: D IH0 R EY1 N JH","strength":2},{"word":"DOWNRANGE","display":"[2] DOWNRANGE: D AW1 N R EY1 N JH","strength":2},{"word":"LESTRANGE","display":"[2] LESTRANGE: L EH0 S T R EY1 N JH","strength":2},{"word":"ESTRANGE","display":"[2] ESTRANGE: EH0 S T R EY1 N JH","strength":2},{"word":"STRANGE","display":"[2] STRANGE: S T R EY1 N JH","strength":2},{"word":"GRANGE","display":"[2] GRANGE: G R EY1 N JH","strength":2},{"word":"LONG-RANGE","display":"[2] LONG-RANGE: L AO1 NG R EY1 N JH","strength":2},{"word":"PRANGE","display":"[2] PRANGE: P R EY1 N JH","strength":2},{"word":"RANGE","display":"[2] RANGE: R EY1 N JH","strength":2},{"word":"MANGE","display":"[2] MANGE: M EY1 N JH","strength":2},{"word":"PHALANGE(1)","display":"[2] PHALANGE(1): F AH0 L EY1 N JH","strength":2},{"word":"ANGE","display":"[2] ANGE: EY1 N JH","strength":2},{"word":"PREARRANGE","display":"[2] PREARRANGE: P R IY2 ER0 EY1 N JH","strength":2},{"word":"ARRANGE","display":"[2] ARRANGE: ER0 EY1 N JH","strength":2},{"word":"EXCHANGE","display":"[2] EXCHANGE: IH0 K S CH EY1 N JH","strength":2},{"word":"INTERCHANGE","display":"[2] INTERCHANGE: IH2 N T ER0 CH EY1 N JH","strength":2},{"word":"INTERCHANGE(1)","display":"[2] INTERCHANGE(1): IH2 N ER0 CH EY1 N JH","strength":2},{"word":"SHORTCHANGE","display":"[2] SHORTCHANGE: SH AO2 R T CH EY1 N JH","strength":2},{"word":"CHANGE","display":"[2] CHANGE: CH EY1 N JH","strength":2},{"word":"AVENGE","display":"[2] AVENGE: AH0 V EH1 N JH","strength":2},{"word":"REVENGE","display":"[2] REVENGE: R IY0 V EH1 N JH","strength":2},{"word":"BENGE","display":"[2] BENGE: B EH1 N JH","strength":2},{"word":"KLENGE","display":"[2] KLENGE: K L EH1 N JH","strength":2},{"word":"MENGE","display":"[2] MENGE: M EH1 N JH","strength":2},{"word":"WENGE","display":"[2] WENGE: W EH1 N JH","strength":2},{"word":"ENGE","display":"[2] ENGE: EH1 N JH","strength":2},{"word":"BANGE","display":"[2] BANGE: B AE1 N JH","strength":2},{"word":"FLANGE","display":"[2] FLANGE: F L AE1 N JH","strength":2},{"word":"PHALANGE","display":"[2] PHALANGE: F AH0 L AE1 N JH","strength":2},{"word":"GANGE","display":"[2] GANGE: G AE1 N JH","strength":2},{"word":"STANGE","display":"[2] STANGE: S T AE1 N JH","strength":2},{"word":"TANGE","display":"[2] TANGE: T AE1 N JH","strength":2},{"word":"REARRANGE","display":"[2] REARRANGE: R IY2 ER0 EY1 N JH","strength":2},{"word":"CRINGE","display":"[2] CRINGE: K R IH1 N JH","strength":2},{"word":"INFRINGE","display":"[2] INFRINGE: IH2 N F R IH1 N JH","strength":2},{"word":"FRINGE","display":"[2] FRINGE: F R IH1 N JH","strength":2},{"word":"UNHINGE","display":"[2] UNHINGE: AH0 N HH IH1 N JH","strength":2},{"word":"HINGE","display":"[2] HINGE: HH IH1 N JH","strength":2},{"word":"IMPINGE","display":"[2] IMPINGE: IH2 M P IH1 N JH","strength":2},{"word":"KLINGE","display":"[2] KLINGE: K L IH1 N JH","strength":2},{"word":"MINGE","display":"[2] MINGE: M IH1 N JH","strength":2},{"word":"SINGE","display":"[2] SINGE: S IH1 N JH","strength":2},{"word":"SYRINGE","display":"[2] SYRINGE: S ER0 IH1 N JH","strength":2},{"word":"TINGE","display":"[2] TINGE: T IH1 N JH","strength":2},{"word":"TWINGE","display":"[2] TWINGE: T W IH1 N JH","strength":2},{"word":"WINGE","display":"[2] WINGE: W IH1 N JH","strength":2},{"word":"VINJE","display":"[2] VINJE: V IH1 N JH","strength":2},{"word":"INGE","display":"[2] INGE: IH1 N JH","strength":2},{"word":"BUNGE","display":"[2] BUNGE: B AH1 N JH","strength":2},{"word":"EXPUNGE","display":"[2] EXPUNGE: IH0 K S P AH1 N JH","strength":2},{"word":"SPONGE","display":"[2] SPONGE: S P AH1 N JH","strength":2},{"word":"GRUNGE","display":"[2] GRUNGE: G R AH1 N JH","strength":2},{"word":"RUNGE","display":"[2] RUNGE: R AH1 N JH","strength":2},{"word":"PLUNGE","display":"[2] PLUNGE: P L AH1 N JH","strength":2},{"word":"LUNGE","display":"[2] LUNGE: L AH1 N JH","strength":2},{"word":"YOUNGE","display":"[2] YOUNGE: Y AH1 N JH","strength":2},{"word":"COLLINGE","display":"[2] COLLINGE: K AA1 L IH0 N JH","strength":2},{"word":"ORANGE(1)","display":"[2] ORANGE(1): AO1 R IH0 N JH","strength":2},{"word":"SYRINGE(1)","display":"[2] SYRINGE(1): S IH1 R IH0 N JH","strength":2},{"word":"DEGRANGE","display":"[2] DEGRANGE: D EH1 G R EY0 N JH","strength":2},{"word":"DELANGE","display":"[2] DELANGE: D EH1 L EY0 N JH","strength":2},{"word":"DELAGRANGE","display":"[2] DELAGRANGE: D EH0 L AA1 G R AA0 N JH","strength":2},{"word":"LAGRANGE","display":"[2] LAGRANGE: L AE1 G R EY2 N JH","strength":2},{"word":"LONGRANGE","display":"[2] LONGRANGE: L AO1 NG R EY2 N JH","strength":2},{"word":"MIDRANGE","display":"[2] MIDRANGE: M IH1 D R EY2 N JH","strength":2},{"word":"LONGE","display":"[2] LONGE: L AA1 N JH","strength":2},{"word":"MONGE","display":"[2] MONGE: M AA1 N JH","strength":2},{"word":"STONGE","display":"[2] STONGE: S T AA1 N JH","strength":2},{"word":"TONGE","display":"[2] TONGE: T AA1 N JH","strength":2},{"word":"LOUNGE","display":"[2] LOUNGE: L AW1 N JH","strength":2},{"word":"SCROUNGE","display":"[2] SCROUNGE: S K R AW1 N JH","strength":2},{"word":"STONEHENGE","display":"[2] STONEHENGE: S T OW1 N HH EH2 N JH","strength":2}];
}

// Start 'er up:
render(<App />, document.body);
*/
