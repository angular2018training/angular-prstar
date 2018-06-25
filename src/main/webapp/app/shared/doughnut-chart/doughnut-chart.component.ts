import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as $ from "jquery";

@Component({
    selector: 'doughnut-chart',
    templateUrl: 'doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.scss']
    
})

export class DoughnutChartComponent implements OnInit {

    @Input() percent;
    @Input() index;

    constructor() { }

    ngOnInit() {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes) {
            setTimeout(() => {
                this.percent = this.percent ? this.percent : 0;
                let graphEle = $('#graph');
                if(this.index) {
                    graphEle = $('[data-index='+this.index+']');
                }
                if(graphEle.length > 0 && graphEle[0].classList.value.indexOf('goal') > -1) {
                    graphEle.toggleClass(graphEle[0].classList[1] + ' goal-' + Math.floor(this.percent));
                } 
            }, 200);
            
        }
        
    }
}
