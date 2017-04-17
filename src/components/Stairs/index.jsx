
import React, {Component} from 'react'
import styles from './stairs.pcss'

const polygons = [
	'polygon(465px 603px, ' + // 1
			'465px 400px, ' + // 2
			'401px 366px, ' + // 3
			'401px 381px, ' + // 4
			'339px 341px, ' + // 5
			'339px 362px, ' + // 6
			'274px 320px, ' + // 7
			'274px 337px, ' + // 8
			'207px 298px, ' + // 9
			'207px 315px, ' + // 10
			'141px 279px, ' + // 11
			'141px 297px, ' + // 12
			'77px 259px, '  + // 13
			'77px 369px)',    // 14
	
	'polygon(592px 524px, ' + // 15
			'592px 310px, ' + // 16
			'532px 342px, ' +
			'531px 361px, ' +
			'465px 400px, ' + // 2
			'465px 603px)',   // 1
	
	'polygon(725px 605px, ' + // 17
			'725px 402px, ' + // 18
			'657px 364px, ' + // 19
			'658px 345px, ' + // 20
			'592px 310px, ' + // 16
			'592px 524px)',   // 15
	
	'polygon(1138px 367px,' + // 20
			'1137px 269px,' + // 21
			'1071px 306px,' + // 23
			'1069px 283px,' + // 24
			'990px 327px,' +  // 25
			'989px 308px,' +  // 26
			'924px 344px,' +  // 27
			'923px 326px,' +  // 28
			'856px 365px,' +  // 29
			'855px 344px,' +  // 30
			'788px 383px,' +  // 31
			'789px 366px,' +  // 32
			'725px 402px,' +  // 17
			'725px 605px)',   // 18
	
	'polygon(788px 305px,' + // 33
			'805px 316px,' + // 34
			'854px 287px,' + // 35
			'873px 296px,' + // 36
			'919px 268px,' + // 37
			'941px 281px,' + // 38
			'981px 261px,' + // 39
			'929px 227px,' + // 40
			'929px 246px,' + // 41
			'857px 204px,' + // 42
			'857px 224px,' + // 43
			'789px 183px,' + // 44
			'789px 204px,' + // 45
			'716px 161px,' + // 46
			'716px 179px,' + // 47
			'647px 142px,' + // 48
			'647px 158px,' + // 49
			'716px 197px,' + // 50
			'716px 307px,' + // 51
			'719px 309px,' + // 52
			'719px 326px,' + // 53
			'741px 338px)',  // 54
	
	'polygon(455px 330px,' + // 55
			'405px 300px,' + // 56
			'389px 311px,' + // 57
			'337px 282px,' + // 58
			'325px 290px,' + // 59
			'271px 259px,' + // 60
			'256px 270px,' + // 61
			'227px 252px,' + // 62
			'270px 228px,' + // 63
			'270px 242px,' + // 64
			'331px 207px,' + // 65
			'331px 225px,' + // 66
			'396px 187px,' + // 67
			'396px 201px,' + // 68
			'459px 165px,' + // 69
			'459px 182px,' + // 70
			'525px 142px,' + // 71
			'525px 159px,' + // 72
			'463px 197px,' + // 73
			'463px 326px)',  // 74
	
	'polygon(468px 324px,' +
			'468px 307px,' +
			'530px 273px,' +
			'592px 310px,' + // 16
			'592px 290px,' +
			'528px 252px,' +
			'528px 233px,' +
			'463px 197px,' + // 73
			'463px 326px)'   // 74
	
]

export default class Stairs extends Component {
	render() {
		return (
			<div className={styles.layerContainer}>
				{polygons.map(p => (
					<div
						className={styles.layer}
						style={{
							WebkitClipPath: p
						}} />
				))}
			</div>
		)
	}
}