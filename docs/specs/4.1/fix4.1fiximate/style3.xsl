<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl" indent-result="yes">

	<xsl:template match="/">
		<HTML>
		<HEAD>
			<TITLE>FIX</TITLE>
		</HEAD>
		<BODY bgcolor="e8e8e8">
			<xsl:apply-templates select="./TAGS/FileName" />
			<P />
				
			<TABLE width="100%" border="0" cellspacing="0" cellpadding="8" STYLE="font-family:Arial, Helvetica; font-size:12pt; color:navy">
			<TR>
				<TD align="center" colspan="3" bgColor="#cccccc">TAG</TD>
				<TD align="center" bgColor="#99ccff">FieldName</TD>
				<TD align="center" bgColor="#cccccc">Req'd</TD>
				<TD align="center" bgColor="#99ccff">Comments</TD>	
			</TR>
			<xsl:apply-templates select="./TAGS" />
			</TABLE>
		</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="TAGS">
		<xsl:apply-templates select="./TAG" />
	</xsl:template>

	<xsl:template match="TAG">
		<xsl:apply-templates select="./level0" />
	</xsl:template>

	<xsl:template match="fieldID">
		<xsl:value-of />
	</xsl:template>


	<xsl:template match="fieldName">
		<xsl:apply-templates select=".//hiddenName" /><xsl:apply-templates select=".//msgName" /><xsl:value-of select="shownName"/>
	</xsl:template>
	
	<xsl:template match="hiddenName"><A STYLE="color:#006699"><xsl:attribute name="href">fixTable.xml#<xsl:value-of /></xsl:attribute><xsl:attribute name="TARGET">dw</xsl:attribute></A></xsl:template>

	<xsl:template match="msgName"><A STYLE="color:#006699"><xsl:attribute name="href"><xsl:value-of />.xml</xsl:attribute><xsl:attribute name="TARGET">lot</xsl:attribute></A></xsl:template>
	
	<xsl:template match="reqd">
		<xsl:value-of />
	</xsl:template>

	<xsl:template match="commts">
		<xsl:value-of />
	</xsl:template>

	<xsl:template match="level0">
		<TR>
			<TD colspan="3" bgColor="#99ccff" valign="top"><xsl:apply-templates select="fieldID" /></TD>
			<TD bgColor="#cccccc" valign="top"><xsl:apply-templates select="fieldName" /></TD>
			<TD bgColor="#99ccff" valign="top" align="center"><xsl:apply-templates select="reqd" /></TD>
			<TD bgColor="#cccccc" valign="top"><xsl:apply-templates select="commts" /></TD>
		</TR>
		<TR><TD COLSPAN="6" bgColor="#006699" height="1px"> </TD></TR>
		<xsl:apply-templates select="./TAG/level1" />
	</xsl:template>

	<xsl:template match="level1">
		<TR><TD bgColor="#99ccff"><img src="arrow.bmp" /></TD>
		<TD colspan="2" bgcolor="#99ccff"><xsl:apply-templates select="fieldID" /></TD>
		<TD bgcolor="#cccccc"><xsl:apply-templates select="fieldName" /></TD>
		<TD bgcolor="#99ccff" align="center"><xsl:apply-templates select="reqd" /></TD>
		<TD bgcolor="#cccccc"><xsl:apply-templates select="commts" /></TD></TR>
		<TR><TD COLSPAN="6" bgColor="#006699" height="1px"> </TD></TR>
		<xsl:apply-templates select="./TAG/level2" />
	</xsl:template>

	<xsl:template match="level2">
	<TR>
		<TD bgColor="#99ccff"><img src="arrow.bmp" /> </TD><TD bgColor="#99ccff"><img src="arrow.bmp" /> </TD>
		<TD bgcolor="#99ccff"><xsl:apply-templates select="fieldID" /></TD>
		<TD bgcolor="#cccccc"><xsl:apply-templates select="fieldName" /></TD>
		<TD bgcolor="#99ccff" align="center"><xsl:apply-templates select="reqd" /></TD>
		<TD bgcolor="#cccccc"><xsl:apply-templates select="commts" /></TD>
	</TR>
	<TR><TD COLSPAN="6" bgColor="#006699" height="1px"> </TD></TR>
	</xsl:template>

	<xsl:template match="FileName">
		<center><font size="+1" face="Arial" color="#006699"><b><xsl:value-of /></b></font></center>
	</xsl:template>

</xsl:stylesheet>