import React, { Component } from "react";
import DelButton from "./buttons/DelButton";
import DetailsButton from "./buttons/DetailsButton";

class EmpTable extends Component {
	
	state = {
		data: this.props.employee,
		sortAsc: false
	}

	static getDerivedStateFromProps(props, state){
		if(state.data !== props.employee){
			return{
				data: props.employee
			};
		}
		return null;
	}

	onSort(event, sortKey){
		let asc = this.state.sortAsc;
		const data = this.state.data;
		console.log(`SortKey ${sortKey}`);
		if(asc){
			console.log("ASC");
			data.sort((a,b)=>{
				if(a[sortKey] < b[sortKey]){
					return -1;
				}
				if(a[sortKey] > b[sortKey]){
					return 1;
				}
			});
			this.setState({sortAsc:false});
		}
		else{
			console.log("DESC");
			data.sort((a,b)=>{
				if(a[sortKey] > b[sortKey]){
					return -1;
				}
				if(a[sortKey] < b[sortKey]){
					return 1;
				}
			});
			this.setState({sortAsc:true});
		}
	}

	render() { 
		let emps = this.state.data;
		
		return (
			<>
				<h4>{this.props.text}</h4>
				<table className="table table-striped">
					<thead>
						<tr>
							<th onClick={e => this.onSort(e,"id")}>ID</th>
							<th onClick={e => this.onSort(e,"firstName")}>First name</th>
							<th onClick={e => this.onSort(e,"lastName")}>Last name</th>
							<th onClick={e => this.onSort(e,"eDetails")}>Role</th>
							<th onClick={e => this.onSort(e,"departmentName")}>Department</th>
						</tr>
					</thead>
					<tbody>
						{emps.map((emp)=> (
							<tr key={emp.id} >
								<td>{emp.id}</td>
								<td>{emp.firstName}</td>
								<td>{emp.lastName}</td>
								<td>{emp.eDetails.role}</td>
								<td>{emp.departmentName}</td>
								<td><DetailsButton onDetails={this.props.onDetails} id={emp.id}/></td>
								<td><DelButton onDelete={this.props.onDelete} id={emp.id} /></td>
							</tr>
						))}
					</tbody>
				</table>
			</> 
		);
	}
}

export default EmpTable;